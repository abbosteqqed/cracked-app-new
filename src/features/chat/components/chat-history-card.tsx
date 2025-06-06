import { formatDate } from "@/lib/format-date";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ChatHistoryCardProps {
	createdAt: Date;
	agentType: string;
	name: string;
	id: string;
}
const ChatHistoryCard = ({
	createdAt,
	agentType,
	name,
	id,
}: ChatHistoryCardProps) => {
	const chatUrl = () => {
		if (agentType === "pdf-agent") {
			return `/app/chat-pdf/${id}`;
		}
		if (agentType === "youtube-chat") {
			return `/app/chat-youtube/${id}`;
		}
		return `/app/chat/${id}`;
	};
	return (
		<Link
			href={chatUrl()}
			className="bg-slate-3 rounded-xl p-5 shadow-lg border border-slate-6 hover:ring-2 hover:ring-slate-7 transition-all duration-300 relative overflow-hidden group">
			<div className="flex justify-between items-start mb-4">
				<div>
					<span className="text-neutral-400 text-sm block">
						{formatDate(createdAt)}
					</span>
					<span className="text-neutral-50 font-medium text-sm capitalize mt-1 block">
						{agentType}
					</span>
				</div>
				<div className="text-neutral-500 group-hover:text-neutral-100 duration-300">
					<ArrowRightIcon className="h-5 w-5" />
				</div>
			</div>
			<h3 className="text-lg font-semibold text-white truncate line-clamp-2 whitespace-normal">
				{name}
			</h3>
			<div className="absolute inset-0 bg-linear-to-br from-[#2A2A2A] via-transparent to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
		</Link>
	);
};

export default ChatHistoryCard;
