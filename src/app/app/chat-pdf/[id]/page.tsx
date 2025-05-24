import { getPdfChat } from "@/features/pdf-agent/actions/get-pdf-chat";
import ChatPdf from "@/features/pdf-agent/components/chat-pdf";

import { notFound } from "next/navigation";

const ChatPdfPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const chat = await getPdfChat((await params).id);
	if (!chat) return notFound();
	return <ChatPdf chat={chat} />;
};

export default ChatPdfPage;
