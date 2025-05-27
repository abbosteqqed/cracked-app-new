import HeadshotGeneratorForm from "@/features/headshot-generator/components/headshot-generator-form";
import React from "react";

const HeadshotGenerator = () => {
	return (
		<div className="w-full pt-10 pb-6 md:pt-20 px-6">
			<div className="flex flex-col items-center justify-center mb-10">
				<h1 className="md:text-6xl text-3xl font-semibold max-w-2xl text-center mb-4">AI LinkedIn Headshot Generator</h1>
				<p className="text-slate-10">
					Upload up to 3 photos and get professional LinkedIn headshots that
					maintain your facial features
				</p>
			</div>
            <HeadshotGeneratorForm />
			
		</div>
	);
};

export default HeadshotGenerator;
