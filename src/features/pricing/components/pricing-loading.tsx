import { Skeleton } from "@/components/ui/skleton";
import React from "react";

const PricingLoading = () => {
	return (
		<div className="grid grid-cols-3 mt-10 gap-6">
			<Skeleton className="w-full h-[320px]" />
			<Skeleton className="w-full h-[320px]" />
			<Skeleton className="w-full h-[320px]" />
		</div>
	);
};

export default PricingLoading;
