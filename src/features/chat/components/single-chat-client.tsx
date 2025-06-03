import ChatClient from "./chat-client";
import { getChatDetails } from "../actions/get-chat-details";
import { notFound } from "next/navigation";
import { convertAIMessage } from "@/lib/utils";

const SingleChatClient = async ({ chatId }: { chatId: string }) => {
	const { chat } = await getChatDetails({ chatId });
	if (!chat) return notFound();
	return (
		<div className="w-full flex flex-col h-[calc(100vh-68px)]">
			<ChatClient
				chatId={chatId}
				initialMessages={convertAIMessage({ messages: chat.messages })}
			/>
		</div>
	);
};

export default SingleChatClient;
