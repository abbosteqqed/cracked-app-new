"use server";
import db from "@/lib/db";

export const getPdfChat = async (id: string) => {
	try {
		const chat = await db.chat.findUnique({
			where: {
				id,
			},
			select: {
				agentId: true,
				id: true,
				messages: {
					include: {
						experimental_attachments: true,
					},
				},
			},
		});

		if (!chat) {
			return null;
		}

		const dataAgent = await db.pdfAgent.findUnique({
			where: {
				id: chat.agentId,
			},
		});

		if (!dataAgent) {
			return null;
		}

		return chat;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
