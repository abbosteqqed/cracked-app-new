import { Skeleton } from "@/components/ui/skleton";
import React from "react";

const AppHistoryLoading = () => {
	return (
		<div className="grid mt-10">
            <Skeleton className="h-8 w-[100px] mb-8"></Skeleton>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{["h", "h", "h", "h"].map((item, index) => (
					<div
						key={item + index}
						className="h-[128px] border border-slate-6 bg-slate-3 w-full rounded-xl p-6 flex flex-col justify-between">
						<div className="flex flex-col gap-1 w-full">
							<Skeleton className="h-3 w-full bg-slate-9" />
							<Skeleton className="h-4 w-full bg-slate-9" />
						</div>
						<Skeleton className="h-7 w-full bg-slate-9" />
					</div>
				))}
			</div>
		</div>
	);
};

export default AppHistoryLoading;
