import { Skeleton } from "@/components/ui/skleton";
import React from "react";

const PdfAgentFormLoding = () => {
	return (
		<div className="w-full flex flex-col">
			<Skeleton className="h-5 w-[100px] mb-2" />
			<Skeleton className="h-10 w-full mb-6" />
			<Skeleton className="w-full h-[262px]" />
			<Skeleton className="w-[120px] mt-10 h-[32px]" />
		</div>
	);
};

export default PdfAgentFormLoding;
