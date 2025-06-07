/* eslint-disable @next/next/no-img-element */
"use client";
import { downloadImageByUrl, generateBase64 } from "@/lib/utils";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import ImagesUpload from "./images-upload";
import { Button } from "@/components/ui/button";
import { generateHeadshotsReplicateAction } from "../actions/generate-headshot-replicate-action";
import { DownloadIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skleton";

const HeadshotGeneratorReplicateForm = () => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [isPending, startTransition] = useTransition();
	const [generatedHeadshots, setGeneratedHeadshots] = useState<string | null>(
		null
	);

	const handleFilesChange = (files: File[]) => {
		setSelectedFiles(files);
	};

	const generateHeadshots = async () => {
		try {
			const imageBase64Promises = selectedFiles.map((file) =>
				generateBase64(file)
			);
			const imageBase64Array = await Promise.all(imageBase64Promises);

			const result = await generateHeadshotsReplicateAction(
				imageBase64Array[0]
			);
			return result.url;
		} catch (error) {
			toast.error("Failed to generate headshots. Please try again.");
			throw error;
		}
	};

	const handleGenerateHeadshots = async () => {
		startTransition(() => {
			generateHeadshots()
				.then((data) => {
					setGeneratedHeadshots(data);
				})
				.catch((error) => {
					console.error("Error generating headshots:", error);
				});
			console.log("Generating headshots for files:", selectedFiles);
		});
	};
	return (
		<div className="w-full max-w-4xl mx-auto grid grid-cols-1 gap-8">
			<div className="w-full p-8 rounded-2xl border border-slate-6 bg-slate-3 mx-auto flex flex-col gap-6">
				{!isPending && (
					<ImagesUpload
						maxFiles={1}
						files={selectedFiles}
						onFilesChange={handleFilesChange}
						showPreview={false}
					/>
				)}
				{selectedFiles.map((item) => (
					<img
						src={URL.createObjectURL(item)}
						className="w-full h-auto rounded-lg max-w-lg mx-auto aspect-square object-cover"
						key={item.type}
						alt="Preview"
					/>
				))}
				<Button
					type="button"
					disabled={isPending || selectedFiles.length < 1}
					onClick={handleGenerateHeadshots}
					className="w-full">
					{isPending ? "Generating..." : "Generate Headshots 20K Credits"}
				</Button>
				<div className="w-full mt-6">
					<h2 className="text-2xl text-center font-semibold">
						Generated images
					</h2>
					{!isPending && !generatedHeadshots && (
						<p className="text-sm text-white/50">No generated photos</p>
					)}
					{!isPending && generatedHeadshots && (
						<div className="w-full mt-10 flex flex-col items-center">
							<img
								src={generatedHeadshots}
								className="w-full h-auto aspect-square max-w-lg mx-auto rounded-lg mb-4"
								alt="Generated Image"
							/>
							<Button
								variant="outline"
								className="mt-4 w-full max-w-lg mx-auto"
								onClick={() => downloadImageByUrl(generatedHeadshots)}>
								Download
								<DownloadIcon className="ml-2" />
							</Button>
						</div>
					)}
					{isPending && (
						<div className="w-full">
							<Skeleton className="w-full aspect-square rounded-lg max-w-lg mx-auto" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HeadshotGeneratorReplicateForm;
