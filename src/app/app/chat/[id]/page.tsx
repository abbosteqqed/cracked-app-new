import SingleChatClient from "@/features/chat/components/single-chat-client";
import React from "react";

const AgentChat = async ({ params }: { params: Promise<{ id: string }> }) => {
	return <SingleChatClient chatId={(await params).id} />;
};

export default AgentChat;
