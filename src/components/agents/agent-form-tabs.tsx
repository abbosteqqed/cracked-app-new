import { cn } from "@/lib/utils";
import React from "react";

interface AgentFormTabs {
	tabs: { id: number; title: string }[];
	handleChangeTab: (val: number) => void;
	activeId: number;
	disabled: boolean;
}

const AgentFormTabs = ({
	tabs,
	handleChangeTab,
	activeId,
	disabled,
}: AgentFormTabs) => {
	return (
		<div className="grid gap-1 h-max">
			{tabs.map((tab, i) => {
				const isActive = i + 1 === activeId;
				return (
					<button
						key={tab.id}
						type="button"
						disabled={isActive || activeId < tab.id || disabled}
						onClick={() => handleChangeTab(tab.id)}
						className={cn(
							"flex h-10 items-center pr-4 cursor-pointer w-max group rounded-[10px] transition-colors hover:bg-white/5",
							{
								"bg-white/5": isActive,
							}
						)}>
						<div
							className={cn(
								"w-8 flex text-xs justify-center items-center transition-colors group-hover:text-white",
								isActive ? "text-white" : "text-white/50"
							)}>
							{i + 1}
						</div>
						<div className="bg-white/10 w-[1px] h-5" />
						<span
							className={cn(
								"ml-3 text-sm group-hover:text-white transition-colors",
								isActive ? "text-white" : "text-white/60"
							)}>
							{tab.title}
						</span>
					</button>
				);
			})}
		</div>
	);
};

export default AgentFormTabs;
