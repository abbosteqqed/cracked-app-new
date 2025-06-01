import React from "react";
import AgentFormTabs from "./agent-form-tabs";

interface AgentFromWrapperTabs {
	tabs: { id: number; title: string }[];
	handleChangeTab: (val: number) => void;
	activeId: number;
	isPending: boolean;
	children?: React.ReactNode;
}

const AgentFormWrapper = ({
	isPending,
	children,
	...props
}: AgentFromWrapperTabs) => {
	return (
		<div className="grid grid-cols-[144px_1fr] gap-4">
			<AgentFormTabs
				disabled={isPending}
				{...props}
			/>
			<div className="w-full">{children}</div>
		</div>
	);
};

export default AgentFormWrapper;
