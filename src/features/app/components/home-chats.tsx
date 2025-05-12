"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHomeChats } from "../actions/get-home-chats";
import ChatHistoryCard from "@/features/chat/components/chat-history-card";
import { Skeleton } from "@/components/ui/skleton";

const HomeChats = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ["chats"],
		queryFn: getHomeChats,
	});

	if (isPending) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{["", ""].map((item, index) => (
					<div
						key={item + index}
						className="h-[128px] border border-slate-6 bg-slate-3 w-full rounded-xl p-6 flex flex-col justify-between">
						<div className="flex flex-col gap-1 w-full">
							<Skeleton className="h-3 w-full bg-slate-9" />
							<Skeleton className="h-4 w-full bg-slate-9" />
						</div>
						<Skeleton className="h-7 w-full bg-slate-9" />
					</div>
				))}
			</div>
		);
	}
	if (error) {
		return (
			<div className="w-full">
				<p className="text-red-500">{error.message}</p>
			</div>
		);
	}
	return (
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
	);
};

export default HomeChats;
