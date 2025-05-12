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
import { pusherServer } from "@/lib/pusher";
import { retrieveKnowledge } from "@/features/chat/actions/retrive-knowledge";
import { getChatById } from "@/features/chat/actions/get-chat-by-id";
import { updateChatTitle } from "@/features/chat/actions/update-chat-title";
import { generateTitleFromUserMessage } from "@/features/chat/actions/generate-title-from-user-message";
import generateWriterSystemPrompt from "@/features/chat/actions/generate-system-prompt";
import { usedTokensUpdate } from "@/features/chat/actions/used-tokens";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";

export async function POST(request: NextRequest) {
	try {
		// Parse request
		const {
			id,
			messages,
			selectedChatModel,
		}: { id: string; messages: Array<Message>; selectedChatModel: string } =
			await request.json();

		// Early validation
		if (!id || !messages || !selectedChatModel) {
			return new Response("Missing required parameters", { status: 400 });
		}

		// Run parallel queries for data we need
		const [res, chat] = await Promise.all([getCurrentUser(), getChatById(id)]);

		// Auth check
		if (!res) {
			return new Response("Unauthorized", { status: 401 });
		}
		const user = res.user;

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

		// Generate title in parallel if needed
		if (!chat.name || chat.name === "untitled") {
			generateTitleFromUserMessage({
				message: userMessage,
			}).then((title) => updateChatTitle({ chatId: id, title }));
		}

		// Generate system prompt
		const systemPrompt = await generateWriterSystemPrompt(
			chat.agentId,
			user.id
		);

		// Knowledge
		const knowledgeMessage = await retrieveKnowledge(chat.agentId);
		// Wait for message saving
		await saveMessagePromise;

		// Start streaming response
		return createDataStreamResponse({
			execute: async (dataStream) => {
				const totalCredits = user.credits?.totalCredits ?? 0;
				const maxOutputTokens = creditsToOutput(totalCredits);

				const result = streamText({
					model: myProvider.languageModel(selectedChatModel),
					system: systemPrompt,
					maxTokens: maxOutputTokens < 8162 ? maxOutputTokens : undefined,
					messages: knowledgeMessage
						? [{ ...knowledgeMessage }, ...messages]
						: messages,
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
							const [tokenResult] = await Promise.all([
								updateTokensPromise,
								saveResponsePromise,
							]);

							// Trigger pusher event if tokens were updated
							if (tokenResult?.tokens) {
								pusherServer.trigger(user.id, "tokens", tokenResult.tokens);
							}
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
