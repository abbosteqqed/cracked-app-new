"use client";
import React from "react";
import ImagesUpload from "./images-upload";
import { Button } from "@/components/ui/button";
import { useHeadshotGenerator } from "../hooks/use-headshot-generator";
import { downloadBase64AsJpg } from "@/lib/utils";
import { DownloadIcon} from "lucide-react";

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
				{isPending ? (
					<div className="flex justify-center items-center h-20">
						<p>Generating images get some time please wait...</p>
					</div>
				) : (
					<ImagesUpload
						files={selectedFiles}
						onFilesChange={handleFilesChange}
					/>
				)}
				<Button
					type="button"
					disabled={isPending}
					onClick={handleGenerateHeadshots}
					className="w-full">
					{isPending ? "Generating..." : "Generate Headshots"}
				</Button>

				{based64Image.length > 1 && (
					<div className="flex flex-col items-center">
						<h2 className="text-2xl font-semibold mb-4">
							Your Professional Headshots
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							{based64Image.map((image, index) => (
								<div
									key={index}
									className="flex flex-col relative gap-3">
									<img
										src={`data:image/jpeg;base64,${image}`}
										alt={`Generated Headshot ${index + 1}`}
										className="w-full h-auto rounded-lg"
									/>
									<div className="flex justify-end w-full">
										<Button
											variant="outline"
											onClick={() =>
												downloadBase64AsJpg(image, `headshot-${index + 1}.jpg`)
											}>
											Download
											<DownloadIcon className="ml-2" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default HeadshotGeneratorForm;
