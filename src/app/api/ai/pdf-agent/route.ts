import { saveMessages } from "@/features/chat/actions/save-message";
import { myProvider } from "@/lib/ai/model";
import {
	getMostRecentUserMessage,
	userCoreMessage,
} from "@/lib/utils/get-most-recent-user-messag";
import { sanitizeResponseMessages } from "@/lib/utils/sanitilize-response-message";
import {
	createDataStreamResponse,
	Message,
	smoothStream,
	streamText,
} from "ai";
import { NextRequest } from "next/server";
import cuid from "cuid";
import { creditsToOutput } from "@/lib/token-counter";
import { usedTokensUpdate } from "@/features/chat/actions/used-tokens";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { getPdfChat } from "@/features/pdf-agent/actions/get-pdf-chat";
import db from "@/lib/db";
import { getLastSixMessages, getPdfStore } from "@/lib/pinecone";

export async function POST(request: NextRequest) {
	try {
		// Parse request
		const {
			id,
			messages,
			selectedChatModel,
		}: { id: string; messages: Array<Message>; selectedChatModel: string } =
			await request.json();

		// Run parallel queries for data we need
		const [user, chat] = await Promise.all([getCurrentUser(), getPdfChat(id)]);

		// Auth check
		if (!user) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Chat existence check
		if (!chat) {
			return new Response("Chat not found", { status: 404 });
		}

		// Extract user message
		const userMessage = getMostRecentUserMessage(messages);
		if (!userMessage) {
			return new Response("No user message found", { status: 400 });
		}

		// Subscription check
		if (!user.subscription) {
			return new Response("You have no subscription", { status: 403 });
		}

		// Credits check
		if (!user.credits || user.credits.totalCredits <= 0) {
			return new Response("Insufficient credits. Please purchase more.", {
				status: 402,
			});
		}

		// Save the user message first
		const saveMessagePromise = saveMessages({
			chatId: id,
			messages: [
				{
					id: cuid(),
					content: userCoreMessage(userMessage),
					role: userMessage.role,
					chatId: id,
					experimental_attachments: userMessage.experimental_attachments,
				},
			],
		});

		await saveMessagePromise;

		const agent = await db.pdfAgent.findUnique({
			where: {
				id: chat.agentId,
			},
			select: {
				fileName: true,
			},
		});

		if (!agent) {
			throw Error("Agent not found");
		}

		const results = await getPdfStore(agent.fileName, userMessage.content);

		const context = results.map((item) => item.pageContent).join("\n\n");

		const prompt: Message = {
			role: "system",
			content: `You are an assistant that helps answer questions about the provided document.
        Document content:
        ${context}
        
        Only answer questions based on this document. If you don't know the answer, say "I don't know".`,
			id: cuid(),
		};

		// Start streaming response
		return createDataStreamResponse({
			execute: async (dataStream) => {
				const totalCredits = user.credits?.totalCredits ?? 0;
				const maxOutputTokens = creditsToOutput(totalCredits);

				const result = streamText({
					model: myProvider.languageModel(selectedChatModel),
					system: prompt.content,
					messages: [...getLastSixMessages(messages)],
					maxTokens: maxOutputTokens < 8162 ? maxOutputTokens : undefined,
					maxSteps: 5,
					experimental_transform: smoothStream({ chunking: "word" }),
					onError: async ({ error }) => {
						console.error("Stream error:", error);
					},
					onFinish: async ({ response, reasoning, usage }) => {
						try {
							const updateTokensPromise = usedTokensUpdate(
								usage.promptTokens,
								usage.completionTokens,
								user.id
							);

							const sanitizedResponseMessages = sanitizeResponseMessages({
								messages: response.messages,
								reasoning,
							});

							const saveResponsePromise = saveMessages({
								chatId: id,
								messages: sanitizedResponseMessages.map((msg) => ({
									content: msg.content,
									chatId: id,
									role: msg.role,
									id: cuid(),
								})),
							});

							// Wait for both operations to complete
							await Promise.all([updateTokensPromise, saveResponsePromise]);
						} catch (err) {
							console.error("Error in onFinish handler:", err);
						}
					},
					experimental_telemetry: {
						isEnabled: true,
						functionId: "stream-text",
					},
				});

				result.consumeStream();
				result.mergeIntoDataStream(dataStream, {
					sendReasoning: true,
				});
			},
		});
	} catch (e) {
		console.error("Error processing request:", e);
		return new Response("Internal Server Error", { status: 500 });
	}
}
