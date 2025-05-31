"use server";
import db from "@/lib/db";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { Innertube } from "youtubei.js";

export interface TranscriptEntry {
	text: string;
	timestamp: string;
}

const youtube = await Innertube.create({
	lang: "en",
	location: "US",
	retrieve_player: false,
});

function formatTimestamp(start_ms: number): string {
	const minutes = Math.floor(start_ms / 60000);
	const seconds = Math.floor((start_ms % 60000) / 1000);
	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

async function fetchTranscript(videoId: string): Promise<TranscriptEntry[]> {
	try {
		const info = await youtube.getInfo(videoId);
		const transcriptData = await info.getTranscript();
		const transcript: TranscriptEntry[] =
			transcriptData.transcript.content?.body?.initial_segments.map(
				(segment) => ({
					text: segment.snippet.text ?? "N/A",
					timestamp: formatTimestamp(Number(segment.start_ms)),
				})
			) ?? [];

		return transcript;
	} catch (error) {
		console.error("Error fetching transcript:", error);
		throw error;
	}
}

export async function getYoutubeTranscript(videoId: string) {
	const existingTranscript = await db.youtubeVideoTranscript.findUnique({
		where: {
			videoId,
		},
		select: {
			transcript: true,
		},
	});

	if (existingTranscript) {
		return {
			transcript: `${existingTranscript.transcript}`,
			cache:
				"This video has already been transcribed - Accessing cached transcript instead of using a token",
		};
	}

	console.log(
		`🔄 No existing transcript found. Fetching new transcript from YouTube...`
	);
	try {
		console.log(`📥 Calling YouTube API for video: ${videoId}`);
		const transcript = await fetchTranscript(videoId);

		await db.youtubeVideoTranscript.create({
			data: {
				videoId,
				transcript: transcript as unknown as InputJsonValue,
			},
		});

		return {
			transcript: `${transcript}`,
			cache:
				"This video was transcribed using a token, the transcript is now saved in the database",
		};
	} catch (error) {
		console.error("Error fetching transcript:", error);
		throw new Error("Failed to fetch transcript from YouTube.");
	}
}
