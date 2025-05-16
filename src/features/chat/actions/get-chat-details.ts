"use server";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { getR2SignedUrlAction } from "@/lib/cloudflare-r2";

import db from "@/lib/db";

export const getChatDetails = async ({ chatId }: { chatId?: string }) => {
	if (!chatId) {
		return {
			chat: null,
		};
	}

	try {
		// Get authenticated user
		const user = await getCurrentUser();
		if (!user) {
			throw Error("Unauthorized access");
		}

		const chat = await db.chat.findUnique({
			where: { id: chatId, userId: user.id },
			select: {
				id: true,
				name: true,
				agentId: true,
				agentType: true,
				userId: true,
				createdAt: true,
				updatedAt: true,
				messages: {
					select: {
						id: true,
						content: true,
						role: true,
						createdAt: true,
						updatedAt: true,
						chatId: true,
						experimental_attachments: {
							select: {
								id: true,
								name: true,
								contentType: true,
								url: true,
							},
						},
					},
				},
			},
		});

		if (!chat) {
			return {
				chat: null,
			};
		}

		// Check if user owns this chat
		if (chat.userId !== user.id) {
			throw Error("Access denied to this chat");
		}

		const pdfAttachmentPromises = [];
		for (const message of chat.messages) {
			if (
				message.experimental_attachments.length > 0 &&
				message.role === "user"
			) {
				for (const file of message.experimental_attachments) {
					if (file.contentType === "application/pdf" && file.name) {
						pdfAttachmentPromises.push(
							getR2SignedUrlAction(file.name).then((newUrl) => {
								if (newUrl.url) {
									file.url = newUrl.url;
								}
								return file;
							})
						);
					}
				}
			}
		}
		if (pdfAttachmentPromises.length > 0) {
			await Promise.all(pdfAttachmentPromises);
		}

		return {
			chat,
		};
	} catch (error) {
		console.error("Error retrieving chat details:", error);
		throw error;
	}
};
