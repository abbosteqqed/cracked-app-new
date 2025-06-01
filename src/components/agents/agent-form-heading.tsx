import React from "react";

interface AgentFormHeadingProps {
	title: string;
	description: string;
}

const AgentFormHeading = ({title, description}:AgentFormHeadingProps) => {
	return (
		<>
			<h1 className="md:text-4xl text-2xl font-bold">
				{title}
			</h1>
			<p className="text-sm text-white/70 mt-3 mb-6">
				{description}
			</p>
		</>
	);
};

export default AgentFormHeading;
