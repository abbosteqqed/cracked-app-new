"use client";
import { useQuery } from "@tanstack/react-query";
import { getChatDetails } from "../actions/get-chat-details";
import FormError from "@/components/fields/form-error";
import LoadingPage from "@/components/layout/loading-page";

import { convertToUIMessage } from "@/lib/utils/convert-ui-to-messages";
import { lazy } from "react";
import { useParams } from "next/navigation";

const ChatClient = lazy(() => import("./chat-client"));

const SingleChatClient = () => {
	const params = useParams<{ id: string }>();
	const chatId = "cmajzn2lq0002eo4kqmdovxrx";
	const { error, data, isPending } = useQuery({
		queryKey: ["chat"],
		queryFn: () => getChatDetails({ chatId: params.id }),
	});

	if (error)
		return (
			<div className="py-20 px-6 max-w-5xl w-full mx-auto">
				<FormError message={error.message} />
			</div>
		);
	if (isPending) return <LoadingPage message="Chat loading..." />;
	const { chat } = data;
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
