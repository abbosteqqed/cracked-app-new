"use server";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import {
	fetchTranscript,
} from "./get-youtube-transcript";
import db from "@/lib/db";
import { saveYoutubeTranscriptToPinecone } from "@/lib/pinecone";

export const createChatWithYoutube = async ({
	videoId,
	title,
}: {
	videoId: string;
	title: string;
}) => {
	try {
		const user = await getCurrentUser();

		if (!user) {
			throw new Error("Unauthorized");
		}

		if (!user.subscription || user.subscription.name.toLowerCase() === "free") {
			throw new Error(
				"Free subscription users do not have access to YouTube chat."
			);
		}

		const transcript = await db.youtubeVideoTranscript.findUnique({
			where: { videoId },
		});

		if (!transcript) {
			const transcriptData = await fetchTranscript(videoId);
			if (transcriptData.length === 0) {
				throw new Error("No transcript data found for this video.");
			} else {
				console.log(transcriptData)
				await saveYoutubeTranscriptToPinecone(videoId, transcriptData);
				await db.youtubeVideoTranscript.create({
					data: { videoId },
				});
			}
		}

		const chat = await db.chat.create({
			data: {
				name: title,
				agentId: videoId,
				agentType: "youtube-chat",
				userId: user.id,
			},
		});
		return chat.id;
	} catch (error) {
		throw error;
	}
};
