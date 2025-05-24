"use server";

import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { uploadFileToR2 } from "@/lib/cloudflare-r2";
import db from "@/lib/db";
import { savePdfToPinecone } from "@/lib/pinecone";

export const createPdfAgentChat = async ({
	name,
	file,
}: {
	name: string;
	file: File;
}) => {
	try {
		const user = await getCurrentUser();

		if (!user.subscription || user.subscription.name.toLowerCase() === "free") {
			throw Error("Free subscription user has not access use pdf agent.");
		}
		const resFile = await uploadFileToR2(file);
		await savePdfToPinecone(resFile.name, resFile.url);
		const pdfAgent = await db.pdfAgent.create({
			data: {
				name,
				description:
					"Chat directly with your PDF documents to get instant answers and insights.",
				fileName: resFile.name,
			},
		});
		const chat = await db.chat.create({
			data: {
				name,
				agentId: pdfAgent.id,
				agentType: "pdf-agent",
				userId: user.id,
			},
		});
		return {
			id: chat.id,
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
