import CreateYoutubeChatForm from "@/features/youtube-chat/components/create-youtube-chat-form";
import React from "react";

const YoutubeTranscriptAgent = () => {
	return (
		<div className="w-full pt-10 pb-6 md:pt-20">
			<div className="flex flex-col justify-center mb-10">
				<h1 className="md:text-6xl text-3xl font-semibold max-w-2xl mb-4">
					Chat with YouTube Video
				</h1>
				<p className="text-slate-10">
					Select a YouTube video and create a chat based on its transcript
				</p>
			</div>
			<CreateYoutubeChatForm />
		</div>
	);
};

export default YoutubeTranscriptAgent;
