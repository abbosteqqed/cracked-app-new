"use server";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { env } from "@/lib/config";
import db from "@/lib/db";
import { ResponseInputImageGPT } from "@/types/file";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const createGenerationRequest = (
	prompt: string,
	images: ResponseInputImageGPT[]
) =>
	openai.responses.create({
		model: "gpt-4.1",
		input: [
			{
				role: "user",
				content: [{ type: "input_text", text: prompt }, ...images],
			},
		],
		tools: [{ type: "image_generation" }],
	});

export const generateHeadshotsAction = async (imageBase64Array: string[]) => {
	try {

		const user = await getCurrentUser()
		if(!user) {
			throw new Error("User not authenticated");
		}

		if(user.subscription?.name.toLowerCase() === "free") {
			throw new Error("This feature is not available for free users");
		}
		if (imageBase64Array?.length !== 3) {
			throw new Error("Exactly 3 reference images are required");
		}

		const imageInputs: ResponseInputImageGPT[] = imageBase64Array.map(
			(base64) => ({
				type: "input_image",
				image_url: base64,
				detail: "high",
			})
		);

		const [professionalResponse, casualResponse] = await Promise.all([
			createGenerationRequest(
				`Generate a photorealistic LinkedIn headshot on white background:
        - Direct camera gaze with professional smile
        - Match reference facial features and body shape
        - 512x512px, business formal attire`,
				imageInputs
			),
			createGenerationRequest(
				`Create a contemporary LinkedIn headshot on white background:
        - Warm smile with approachable expression
        - Maintain reference physical characteristics
        - 512x512px, business casual style`,
				imageInputs
			),
		]);

		const extractImageUrl = (response: OpenAI.Responses.Response) =>
			response.output.find((output) => output.type === "image_generation_call")
				?.result || "";
		const usedInputTokens = ((professionalResponse.usage?.input_tokens || 0) + (casualResponse.usage?.input_tokens || 0)) / 1000000 * 2 * 80000;
		const usedOutputTokens = ((professionalResponse.usage?.output_tokens || 0) + (casualResponse.usage?.output_tokens || 0)) / 1000000 * 8 * 80000;
		const totalCredits = usedInputTokens + usedOutputTokens;

		await db.credits.update({
			where:{
				userId: user.id,
			},
			data:{
				totalCredits: {
					decrement: totalCredits,
				},
			}
		})

		return {
			urls: [
				extractImageUrl(professionalResponse),
				extractImageUrl(casualResponse),
			] as [string, string],
		};
	} catch (error) {
		console.error("Headshot generation failed:", error);
		throw new Error("Failed to generate professional headshots");
	}
};
