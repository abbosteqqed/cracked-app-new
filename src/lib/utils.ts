import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Message } from "ai";
import { convertToUIMessage } from "./utils/convert-ui-to-messages";
import { DbMessageWithAttachements } from "@/types/chat";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}



export const convertAIMessage = ({
	messages,
}: {
	messages: DbMessageWithAttachements[];
}): Array<Message> => {
	return messages.map((message) => {
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
	});
};
