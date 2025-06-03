/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { downloadBase64AsJpg } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import React from "react";

const GeneratedImages = ({
	based64ImageList,
}: {
	based64ImageList: string[];
}) => {
	return (
		<div className="flex flex-col items-center">
			<h2 className="text-2xl font-semibold mb-4">
				Your Professional Headshots
			</h2>
			<div className="grid md:grid-cols-2 gap-6">
				{based64ImageList.map((image, index) => (
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
	);
};

export default GeneratedImages;
