import React from "react";
import RecomendedAgentCard from "./recomended-agent-card";
import AGENTS from "@/lib/constants/agents";

const RecommendedAgents = () => {
	return (
		<div className="w-full mt-14 flex flex-col gap-y-8 max-w-5xl mx-auto ">
			<h2 className="font-medium text-2xl">Agents</h2>

			<div className="w-full grid grid-cols-2 gap-5">
				{AGENTS.map((agent, index) => (
					<RecomendedAgentCard
						key={agent.slug + index + "recommended"}
						{...agent}
					/>
				))}
			</div>
		</div>
	);
};

export default RecommendedAgents;
