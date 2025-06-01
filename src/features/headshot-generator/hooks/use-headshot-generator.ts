import { useState, useTransition } from "react";
import { generateHeadshotsAction } from "../actions/generate-images";
import { toast } from "sonner";

const generateBase64 = async (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
};

export const useHeadshotGenerator = () => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [isPending, startTransition] = useTransition();
	const [based64Image, setBase64Image] = useState<string[]>([]);

	const handleFilesChange = (files: File[]) => {
		setSelectedFiles(files);
	};

	const generateHeadshots = async () => {
		try {
			const imageBase64Promises = selectedFiles.map((file) =>
				generateBase64(file)
			);
			const imageBase64Array = await Promise.all(imageBase64Promises);
			return await generateHeadshotsAction(imageBase64Array);
		} catch (error) {
			toast.error("Failed to generate headshots. Please try again.");
			throw error;
		}
	};

	const handleGenerateHeadshots = async () => {
		startTransition(() => {
			generateHeadshots()
				.then((data) => {
					console.log("Headshots generated successfully:", data);

					setBase64Image(data.urls);
				})
				.catch((error) => {
					console.error("Error generating headshots:", error);
				});
			console.log("Generating headshots for files:", selectedFiles);
		});
	};

	return {
		selectedFiles,
		handleFilesChange,
		isPending,
		handleGenerateHeadshots,
		based64Image,
	};
};
