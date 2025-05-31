import AppHistorySection from "@/features/app/components/app-history";
import AppHistoryLoading from "@/features/app/components/app-history-laoding";
import RecommendedAgents from "@/features/app/components/recomended-agents";
import React, { Suspense } from "react";

const AppPage = async() => {
	return (
		<div className="mt-14 grid max-w-5xl mx-auto w-full pb-10">
			<RecommendedAgents />
			<Suspense fallback={<AppHistoryLoading />}>
				<AppHistorySection />
			</Suspense>
		</div>
	);
};

export default AppPage;
