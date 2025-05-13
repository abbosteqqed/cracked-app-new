import HomeChats from "@/features/app/components/home-chats";
import React from "react";

const HomeHistory = () => {
	return (
		<div className="grid mt-10">
			<h2 className="font-medium text-2xl mb-8">History</h2>
			<HomeChats />
		</div>
	);
};

export default HomeHistory;
