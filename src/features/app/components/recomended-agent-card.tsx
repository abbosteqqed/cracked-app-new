import React from "react";
import GradientCircle from "@/components/ui/gradient-circle";
import Link from "next/link";

interface RecomendedAgentCardProps {
	name: string;
	description: string;
	slug: string;
	baseLinK?: string;
}

const RecomendedAgentCard = ({
	name,
	description,
	slug,
	baseLinK = "/app/agents/",
}: RecomendedAgentCardProps) => {
	return (
		<Link href={`${baseLinK}${slug}`}>
			<div className="bg-slate-3 border border-slate-6 hover:border-slate-4 transition-all duration-200 backdrop-blur-2xl rounded-2xl p-6 flex size-full flex-col gap-6">
				<GradientCircle className="h-10 w-10 rounded-full" />
				<div className="w-full flex flex-col gap-y-1.5">
					<h3 className="text-sm">{name}</h3>
					<p className="text-xs text-white/60 line-clamp-2">{description}</p>
				</div>
			</div>
		</Link>
	);
};

export default RecomendedAgentCard;
