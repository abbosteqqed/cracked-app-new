import React from "react";
import RecomendedAgentCard from "./recomended-agent-card";
import AGENTS, { GENERTORS } from "@/lib/constants/agents";

const RecommendedAgents = () => {
	return (
		<>
			<div className="w-full">
				<h2 className="font-medium text-2xl mb-8">Agents</h2>
				<div className="w-full grid grid-cols-2 gap-5">
					{AGENTS.map((agent, index) => (
						<RecomendedAgentCard
							key={agent.slug + index + "recommended"}
							{...agent}
						/>
					))}
				</div>
			</div>
			<div className="w-full mt-20">
				<h2 className="font-medium text-2xl mb-8">Image Generators</h2>
				<div className="w-full grid grid-cols-2 gap-5">
					{GENERTORS.map((agent, index) => (
						<RecomendedAgentCard
							baseLinK="/app/image-generators/"
							key={agent.slug + index + "recommended"}
							{...agent}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default RecommendedAgents;
