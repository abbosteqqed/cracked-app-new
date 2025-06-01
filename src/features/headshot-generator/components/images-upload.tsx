"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImagesUploadProps {
	files: File[];
	onFilesChange: (files: File[]) => void;
	maxFiles?: number;
	maxSize?: number;
	showPreview?: boolean;
}

export function ImagesUpload({
	files,
	onFilesChange,
	maxFiles = 3,
	maxSize = 5 * 1024 * 1024,
	showPreview = true,
}: ImagesUploadProps) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
			onFilesChange(newFiles);
		},
		[files, onFilesChange, maxFiles]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".jpg", ".jpeg", ".webp"],
		},
		maxSize,
		maxFiles: maxFiles - files.length,
	});

	const removeFile = (index: number) => {
		const newFiles = files.filter((_, i) => i !== index);
		onFilesChange(newFiles);
	};

	return (
		<div className="space-y-4 max-w-5xl mx-auto w-full">
			<div
				{...getRootProps()}
				className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
					isDragActive
						? "border-white bg-slate-3"
						: "border-slate-6 hover:border-slate-8 hover:bg-slate-3"
				}`}>
				<input {...getInputProps()} />
				<Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
				<p className="text-lg font-medium mb-2">
					{isDragActive
						? "Drop the images here..."
						: `Choose up to ${maxFiles === 1 ? "1 image" : `${maxFiles} images`}`}
				</p>
				<p className="text-sm text-gray-600">
					PNG, JPG, JPEG up to {Math.round(maxSize / (1024 * 1024))}MB each
				</p>
			</div>

			{(showPreview &&files.length > 0) && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{files.map((file, index) => (
						<div
							key={index}
							className="relative group">
							<Image
								src={URL.createObjectURL(file) || "/placeholder.svg"}
								alt={`Selected ${index + 1}`}
								width={200}
								height={200}
								className="w-full aspect-square object-cover rounded-lg"
							/>
							<Button
								onClick={() => removeFile(index)}
								size="sm"
								variant="destructive"
								className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
								<X className="w-4 h-4" />
							</Button>
							<span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
								{file.name}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
export default ImagesUpload;
