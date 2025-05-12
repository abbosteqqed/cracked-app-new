"use server";

import db from "@/lib/db";
import { redis } from "@/lib/redis";
import { Chat } from "@prisma/client";

export const getChatById = async (id: string): Promise<Chat | null> => {
	const name = `getChatById:{id}`;
	const cachedChat = await redis.get(name);
	if (cachedChat) {
		return cachedChat as Chat;
	}
	const chat = await db.chat.findUnique({
		where: {
			id,
		},
	});
	if (chat) {
		await redis.set(name, JSON.stringify(chat), {
			ex: 4 * 60 * 60,
		});
	}
	return chat;
};
