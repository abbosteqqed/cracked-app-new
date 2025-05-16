import { convertToUIMessage } from "@/lib/utils/convert-ui-to-messages";
import ChatClient from "./chat-client";
import { getChatDetails } from "../actions/get-chat-details";
import { notFound } from "next/navigation";

const SingleChatClient = async ({ chatId }: { chatId: string }) => {
	const { chat } = await getChatDetails({ chatId });
	if (!chat) return notFound();
	return (
		<div className="w-full flex flex-col h-[calc(100vh-68px)]">
			<ChatClient
				chatId={chatId}
				initialMessages={chat.messages.map((message) => {
					const convertedMessage = convertToUIMessage({
						...message,
					});
					return {
						...convertedMessage,
						experimental_attachments: message.experimental_attachments
							? message.experimental_attachments.map((attachment) => ({
									name: attachment.name === null ? undefined : attachment.name,
									contentType:
										attachment.contentType === null
											? undefined
											: attachment.contentType,
									url: attachment.url,
								}))
							: [],
					};
				})}
			/>
		</div>
	);
};

export default SingleChatClient;
