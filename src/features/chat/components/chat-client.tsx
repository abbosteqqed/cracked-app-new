"use client";
import ChatMultiModalInput from "./chat-multimodal-input";
import { Attachment, Message } from "ai";
import React, { Suspense, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Messages } from "./messages";
import { toast } from "sonner";

const ChatClient = ({
	chatId,
	initialMessages,
}: {
	chatId: string;
	initialMessages: Array<Message>;
}) => {
	const [attachments, setAttachments] = useState<Array<Attachment>>([]);

	const { messages, handleSubmit, input, setInput, isLoading, stop, reload } =
		useChat({
			api: "/api/ai/writer-agent",
			id: chatId,
			body: { id: chatId, selectedChatModel: "pro" },
			initialMessages: initialMessages,
			onError: (error) => {
				toast.error(error.message);
			},
		});

	useEffect(() => {
		console.log(attachments);
	}, [attachments]);

	return (
		<>
			<Messages
				messages={messages}
				isLoading={isLoading}
				reload={reload}
			/>
			<Suspense>
				<ChatMultiModalInput
					chatId={chatId}
					handleSubmit={handleSubmit}
					isLoading={isLoading}
					attachments={attachments}
					setAttachments={setAttachments}
					stop={stop}
					input={input}
					setInput={setInput}
				/>
			</Suspense>
		</>
	);
};

export default ChatClient;
