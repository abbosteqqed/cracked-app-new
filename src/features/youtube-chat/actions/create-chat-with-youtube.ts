"use server";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { getYoutubeTranscript } from "./get-youtube-transcript";
import db from "@/lib/db";

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

		const { transcript } = await getYoutubeTranscript(videoId);

		if (!transcript || transcript.length === 0) {
			throw new Error("No transcript available for this video.");
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
