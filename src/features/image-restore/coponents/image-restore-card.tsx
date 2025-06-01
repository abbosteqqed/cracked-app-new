/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skleton";
import ImagesUpload from "@/features/headshot-generator/components/images-upload";
import { DownloadIcon, X } from "lucide-react";
import React from "react";
import { restoreImage } from "../actions/restore-image";
import { downloadBase64AsJpg, generateBase64 } from "@/lib/utils";
import { toast } from "sonner";

const ImageRestoreCard = () => {
	const [files, setFiles] = React.useState<File[]>([]);
	const handleFilesChange = (files: File[]) => {
		setFiles(files);
	};
	const [generatedImage, setGeneratedImage] = React.useState<string | null>(
		null
	);
	const [isPending, startTransition] = React.useTransition();

	const handleRestoreImage = async () => {
		const imageBase64 = await generateBase64(files[0]);
		startTransition(() => {
			restoreImage(imageBase64)
				.then((data) => {
					setGeneratedImage(data.url);
				})
				.catch((error) => {
					toast.error(
						error.message || "Failed to restore image. Please try again."
					);
				});
		});
	};
	return (
		<div className="w-full max-w-7xl grid md:grid-cols-2 gap-6 mx-auto md:pt-10 pt-6">
			<div className="w-full bg-slate-3 rounded-lg p-6 flex flex-col items-center justify-center">
				<h2 className="text-2xl font-semibold mb-6">
					Select Image for Restoration
				</h2>
				<ImagesUpload
					showPreview={false}
					files={files}
					onFilesChange={handleFilesChange}
					maxFiles={1}
				/>
				{files.length > 0 && (
					<div className="mt-4 w-full">
						<h3 className="text-lg font-medium mb-2">Selected Image:</h3>
						<div className="relative">
							<img
								src={URL.createObjectURL(files[0])}
								alt="Selected"
								className="w-full aspect-square object-cover rounded-md"
							/>
							<Button
								variant="destructive"
								onClick={() => setFiles([])}
								className="ml-auto absolute top-2 right-2 p-1 h-8 w-8 rounded-full">
								<X className="w-4 h-4" />
							</Button>
						</div>
					</div>
				)}
				<Button
					onClick={handleRestoreImage}
					disabled={files.length === 0 || isPending}
					className="w-full mt-6">
					{isPending ? "Restoring Image..." : "Restore Image 10K Credits"}
				</Button>
			</div>
			<div className="w-full p-6 bg-slate-3 rounded-lg">
				<h2 className="text-2xl font-semibold mb-6 text-center">
					Restored Image
				</h2>
				{!isPending && generatedImage && (
					<>
						<img
							src={`data:image/jpeg;base64,${generatedImage}`}
							alt="Selected"
							className="w-full h-auto object-cover rounded-md mt-6"
						/>
						<Button
							variant="outline"
							className="w-full mt-4"
							onClick={() =>
								downloadBase64AsJpg(generatedImage, `restored.jpg`)
							}>
							Download
							<DownloadIcon className="ml-2" />
						</Button>
					</>
				)}
				{!isPending && !generatedImage && (
					<p className="text-center text-gray-500">
						No image restored yet. Please select an image to restore.
					</p>
				)}
				{isPending && (
					<Skeleton className="w-full aspect-square object-cover rounded-md mt-6" />
				)}
			</div>
		</div>
	);
};

export default ImageRestoreCard;
