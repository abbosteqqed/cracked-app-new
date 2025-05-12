import HomeChats from "@/features/app/components/home-chats";
import RecommendedAgents from "@/features/app/components/recomended-agents";
import React from "react";

const AppPage = () => {
	return (
		<div className="mt-14 grid max-w-5xl mx-auto w-full">
			<RecommendedAgents />
			<div className="grid mt-10">
				<h2 className="font-medium text-2xl mb-8">History</h2>
				<HomeChats />
			</div>
		</div>
	);
};

export default AppPage;
