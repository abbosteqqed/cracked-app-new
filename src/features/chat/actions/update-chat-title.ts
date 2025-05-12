"use server";
import db from "@/lib/db";

export const updateChatTitle = async ({
	chatId,
	title,
}: {
	chatId: string;
	title: string;
}) => {
	return await db.chat.update({
		where: {
			id: chatId,
		},
		data: {
			name: title,
		},
	});
};
