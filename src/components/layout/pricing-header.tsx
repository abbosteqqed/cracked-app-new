import React from "react";

const PricingHeader = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<div className="flex w-full items-center justify-center flex-col">
			<h1 className="text-transparent max-w-xl mb-1 bg-clip-text bg-linear-to-br from-white to-white/70 md:text-6xl md:leading-[1.3] text-3xl font-bold text-center">
				{title}
			</h1>
			<p className="text-sm text-white/60 block mt-4">{description}</p>
		</div>
	);
};

export default PricingHeader;
