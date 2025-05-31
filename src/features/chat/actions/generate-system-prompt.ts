
"use server"
import db from "@/lib/db";
import { redis } from "@/lib/redis";

const generateWriterSystemPrompt = async (agentId: string, userId: string) => {
	const cachedName = `writerSystemPrompt:${agentId}`;
	const cachedPrompt = await redis.get(cachedName);
	if (cachedPrompt) {
		return cachedPrompt as string;
	}
	let prompt =
		"You are a highly skilled professional writer specializing in crafting compelling and engaging content. Your expertise spans blog posts, articles, books, and other written materials. You are adept at adapting your writing style to suit the target audience and purpose. Pay close attention to clarity, conciseness, grammar, and style. Always aim for high-quality, original content.";
	const agent = await db.writerAgent.findUnique({
		where: {
			id: agentId,
		},
		select: {
			style: true,
			complexity: true,
			tone: true,
			flavour: true,
			instructions: true,
			includeProfile: true,
		},
	});

	if (!agent) {
		return "";
	}

	if (agent.style) {
		prompt += `*   Style: ${agent.style}\n`;
	}
	if (agent.complexity) {
		prompt += `*   Complexity: ${agent.complexity}\n`;
	}
	if (agent.tone) {
		prompt += `*   Tone: ${agent.tone}\n`;
	}
	if (agent.flavour) {
		prompt += `*   Flavor: ${agent.flavour}\n`;
	}

	if (agent.instructions) {
		const instruction = agent.instructions as string[];
		if (instruction.length > 0) {
			let instructionP = ` * WRITING INSTRUCTION \n`;

			for (const item of instruction) {
				instructionP += ` * ${item}`;
			}

			prompt += instructionP;
		}
	}

	if (agent.includeProfile) {
		const profile = await db.userProfile.findUnique({
			where: {
				userId,
			},
			select: {
				age: true,
				gender: true,
				language: true,
				usedFor: true,
			},
		});

		if (profile) {
			prompt += `Info of me in JSON: ${JSON.stringify(profile)}`;
		}
	}

	await redis.set(cachedName, prompt, {
		ex: 4 * 60 * 60,
	});

	return prompt;
};

export default generateWriterSystemPrompt;
