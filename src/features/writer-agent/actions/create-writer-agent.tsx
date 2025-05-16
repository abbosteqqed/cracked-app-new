"use server";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import db from "@/lib/db";

import { Knowledge, WriterAgentInitialDataDTO } from "@/types/agents/writer";

export const createWriterChat = async (
	data: WriterAgentInitialDataDTO,
	knowledgeItems: Knowledge[]
) => {
	try {
		const user = await getCurrentUser();
		if (!user) {
			return {
				error: "User not found",
			};
		}

		const agent = await db.writerAgent.create({
			data: {
				name: data.persona.name,
				style: data.persona.style,
				description: data.persona.description,
				complexity: data.persona.complexity,
				tone: data.persona.tone,
				flavour: data.persona.flavour,
				includeProfile: false,
				instructions: data.instructions,
				questionSuggestions: data.tasks,
			},
		});

		const chat = await db.chat.create({
			data: {
				name: "untitled",
				userId: user.id,
				agentType: "writer",
				agentId: agent.id,
			},
		});

		const knowledgeContent = knowledgeItems.map((item) => {
			return {
				type: item.type,
				tokens: item.tokens,
				agentId: agent.id,
				fileUrl: item.fileUrl,
				name: item.name,
				websiteContent: item.websiteContent,
			};
		});
		await db.knowledge.createMany({
			data: [...knowledgeContent],
		});

		return {
			success: "Chat created successfully",
			url: `/app/chat/${chat.id}`,
		};
	} catch (e) {
		console.log(e);
		return {
			error: "Something went wrongly please try again later.",
		};
	}
};
