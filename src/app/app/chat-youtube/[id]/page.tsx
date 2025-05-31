import { getYouTubeChat } from "@/features/youtube-chat/actions/get-youtube-chat";
import ChatYouTube from "@/features/youtube-chat/components/chat-youtube";

import { notFound } from "next/navigation";

const ChatPdfPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const chat = await getYouTubeChat((await params).id);
	console.log("chat", chat);
	if (!chat) {
		return notFound();
	}
	return <ChatYouTube chat={chat} />;
};

export default ChatPdfPage;
