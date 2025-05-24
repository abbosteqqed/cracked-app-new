"use client";
import { useChat } from "@ai-sdk/react";
import { convertAIMessage } from "@/lib/utils";
import { DbMessageWithAttachements } from "@/types/chat";
import { toast } from "sonner";
import { Messages } from "@/features/chat/components/messages";
import { lazy, Suspense, useState } from "react";
import { Attachment } from "ai";
const ChatMultiModalInput = lazy(
	() => import("@/features/chat/components/chat-multimodal-input")
);

interface ChatPdfProps {
	chat: {
		id: string;
		agentId: string;
		messages: DbMessageWithAttachements[];
	};
}

const ChatPdf = ({ chat }: ChatPdfProps) => {
	const [attachments, setAttachments] = useState<Array<Attachment>>([]);
	const { messages, isLoading, reload, handleSubmit, input, setInput, stop } =
		useChat({
			api: "/api/ai/pdf-agent",
			id: chat.id,
			body: { id: chat.id, selectedChatModel: "chatgptMini" },
			initialMessages: convertAIMessage({ messages: chat.messages }),
			onError: (error) => {
				toast.error(error.message);
			},
		});

	return (
		<div className="w-full flex flex-col h-[calc(100vh-68px)]">
			<Messages
				messages={messages}
				isLoading={isLoading}
				reload={reload}
			/>
			<Suspense>
				<ChatMultiModalInput
					chatId={chat.id}
					handleSubmit={handleSubmit}
					isLoading={isLoading}
					attachments={attachments}
					setAttachments={setAttachments}
					stop={stop}
					input={input}
					setInput={setInput}
				/>
			</Suspense>
		</div>
	);
};

export default ChatPdf;
