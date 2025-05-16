import React from "react";
import { getHomeChats } from "../actions/get-home-chats";
import ChatHistoryCard from "@/features/chat/components/chat-history-card";

const AppHistorySection = async () => {
	const data = await getHomeChats();
	return (
		<div className="grid mt-10">
			<h2 className="font-medium text-2xl mb-8">History</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{data.length === 0 ? (
					<p>No chats yet</p>
				) : (
					data.map((history) => (
						<ChatHistoryCard
							key={history.id}
							{...history}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default AppHistorySection;
