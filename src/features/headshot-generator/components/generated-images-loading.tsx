import { Skeleton } from "@/components/ui/skleton";
import React from "react";
import { BeatLoader } from "react-spinners";

const GeneratedImagesLoading = () => {
	return (
		<div className="flex flex-col items-center w-full">
			<div className="grid md:grid-cols-2 gap-6 w-full">
				{Array.from({ length: 2 }).map((_, index) => (
					<div
						key={index}
						className="w-full relative">
						<Skeleton className="w-full h-auto aspect-square rounded-lg mb-4" />
						<div className="w-full h-full absolute top-0 left-0 p-6 flex items-center justify-center">
							<BeatLoader color="#fff" size={20} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GeneratedImagesLoading;
