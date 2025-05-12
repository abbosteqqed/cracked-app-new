/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import db from "@/lib/db";
import { MessageRole } from "@prisma/client";
import { Attachment } from "ai";

export async function saveMessages({
	messages,
	chatId,
}: {
	messages: Array<{
		chatId: string;
		role: string;
		content: any;
		id: string;
		experimental_attachments?: Attachment[];
	}>;
	chatId: string;
}) {
	try {
		const createdMessages = [];
		for (const msg of messages) {
			const createdMessage = await db.message.create({
				data: {
					chat: { connect: { id: chatId } },
					id: msg.id,
					role: msg.role as MessageRole,
					content: msg.content,
					experimental_attachments: {
						createMany: {
							data:
								msg.experimental_attachments?.map((attachment: Attachment) => ({
									name: attachment.name,
									pathName: attachment.name,
									contentType: attachment.contentType,
									url: attachment.url,
								})) || [],
						},
					},
				},
				include: { experimental_attachments: true, chat: true }, // Include related data
			});
			createdMessages.push(createdMessage);
		}
		return createdMessages;
	} catch (error) {
		console.error("Failed to save messages in database", error);
		throw error;
	}
}
