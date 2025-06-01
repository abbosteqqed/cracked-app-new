"use server";

import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { env } from "@/lib/config";
import db from "@/lib/db";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function restoreImage(imageBase64: string) {
	try {
		const user = await getCurrentUser();
		if (!user) {
			throw new Error("User not authenticated");
		}

		if (user.subscription?.name.toLowerCase() === "free") {
			throw new Error("This feature is not available for free users");
		}

		if (!user.credits || user.credits.totalCredits < 10000) {
			throw new Error("You do not have enough credits to generate headshots");
		}

		const result = await openai.responses.create({
			model: "gpt-4.1",
			input: [
				{
					role: "user",
					content: [
						{ type: "input_text", text: "Restore and colorize the old photo" },
						{
							type: "input_image",
							image_url: imageBase64,
							detail: "high",
						},
					],
				},
			],
			tools: [{ type: "image_generation" }],
		});

		console.log("OpenAI response:", result);

		const restoredImage =
			result.output.find((output) => output.type === "image_generation_call")
				?.result || "";

		await db.credits.update({
			where: {
				userId: user.id,
			},
			data: {
				totalCredits: {
					decrement: 10000,
				},
			},
		});

		return { url: restoredImage };
	} catch (error) {
		console.error("Error restoring image:", error);
		throw new Error("Failed to restore image");
	}
}
