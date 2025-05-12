"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers } from "next/headers";

export const getHomeChats = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			throw Error("Unauthorized");
		}
		const chats = await db.chat.findMany({
			where: {
				userId: session.user.id,
			},
			select: {
				id: true,
				name: true,
				createdAt: true,
				agentType: true,
			},
		});

		return chats;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
