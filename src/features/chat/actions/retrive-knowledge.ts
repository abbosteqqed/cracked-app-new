"use server";
import { getR2SignedUrlAction } from "@/lib/cloudflare-r2";
import db from "@/lib/db";
import { Knowledge } from "@prisma/client";
import { Message } from "ai";
import cuid from "cuid";

export async function retrieveKnowledge(
	agentId: string
): Promise<Message | undefined> {
	const knowledgeItems = await db.knowledge.findMany({
		where: {
			agentId: agentId,
		},
	});

	if (knowledgeItems.length === 0) {
		return undefined;
	}

	const newKnowledgePdfFileUrls: Knowledge[] = [];
	let knowledgeMessage =
		"In the below I shared knowledge to increase your knowledge and use answer my questions: ";

	for (const knowledge of knowledgeItems) {
		if (knowledge.type === "pdffile") {
			try {
				newKnowledgePdfFileUrls.push(
					await getR2SignedUrlAction(knowledge.name).then((newUrl) => {
						if (newUrl.url) {
							knowledge.fileUrl = newUrl.url;
						}
						return knowledge;
					})
				);
			} catch (e) {
				console.error("Error retrieving R2 signed url", e);
			}
		}
		if (knowledge.type === "website" && knowledge.websiteContent) {
			knowledgeMessage += ` 
        Website url: ${knowledge.fileUrl}
        Website content: "${knowledge.websiteContent}"
        `;
		}
	}

	await Promise.all(newKnowledgePdfFileUrls);

	return {
		id: cuid(),
		content: knowledgeMessage,
		role: "user",
		experimental_attachments: knowledgeItems.map((item) => ({
			url: item.fileUrl,
			contentType: "application/pdf",
		})),
	};
}
