"use client";
import React from "react";
import ImagesUpload from "./images-upload";
import { Button } from "@/components/ui/button";
import { useHeadshotGenerator } from "../hooks/use-headshot-generator";
import GeneratedImages from "./generated-images";
import GeneratedImagesLoading from "./generated-images-loading";

const HeadshotGeneratorForm = () => {
	const {
		selectedFiles,
		handleFilesChange,
		isPending,
		handleGenerateHeadshots,
		based64Image,
	} = useHeadshotGenerator();
	return (
		<div className="w-full">
			<div className="max-w-5xl p-8 rounded-2xl border border-slate-6 bg-slate-3 mx-auto w-full flex flex-col gap-6">
				{!isPending && (
					<ImagesUpload
						files={selectedFiles}
						onFilesChange={handleFilesChange}
					/>
				)}
				<Button
					type="button"
					disabled={isPending || selectedFiles.length < 3}
					onClick={handleGenerateHeadshots}
					className="w-full">
					{isPending ? "Generating..." : "Generate Headshots 20K Credits"}
				</Button>

				{isPending && <GeneratedImagesLoading />}

				{(!isPending && based64Image.length > 1) && (
					<GeneratedImages based64ImageList={based64Image} />
				)}
			</div>
		</div>
	);
};

export default HeadshotGeneratorForm;
