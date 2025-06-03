"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FormError from "@/components/fields/form-error";

interface PdfSelectorProps {
	file: File | null;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	errorMessage?: string;
	disabled?: boolean;
}

export default function PdfSelector({
	file,
	setFile,
	errorMessage,
	disabled,
}: PdfSelectorProps) {
	const [isDragging, setIsDragging] = useState(false);

	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const MAX_FILE_SIZE = 10 * 1024 * 1024;

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	useEffect(() => {
		if (errorMessage) {
			setError(errorMessage);
		} else {
			setError(null);
		}
	}, [errorMessage]);

	const validateFile = (file: File): boolean => {
		if (file.type !== "application/pdf") {
			setError("Only PDF files are allowed");
			return false;
		}

		// Check file size
		if (file.size > MAX_FILE_SIZE) {
			setError(
				`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`
			);
			return false;
		}

		return true;
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		setError(null);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const droppedFile = e.dataTransfer.files[0];

			if (validateFile(droppedFile)) {
				setFile(droppedFile);
			}
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);

		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];

			if (validateFile(selectedFile)) {
				setFile(selectedFile);
			}
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const removeFile = () => {
		setFile(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="bg-slate-3 border border-slate-6 p-6 rounded-lg mt-6">
			<div
				className={cn(
					"p-6 rounded-lg border-2 border-dashed border-slate-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
					isDragging && "border-gray-500 bg-gray-800/50",
					file && "border-gray-600",
					{
						"mb-4": error,
					}
				)}
				onDragOver={!disabled ? handleDragOver : undefined}
				onDragLeave={!disabled ? handleDragLeave : undefined}
				onDrop={!disabled ? handleDrop : undefined}
				onClick={!file ? handleButtonClick : undefined}>
				{!file ? (
					<>
						<Upload className="h-10 w-10 text-gray-400 mb-4" />
						<h3 className="text-lg font-medium text-gray-200 mb-1">
							Drag & drop your PDF here
						</h3>
						<p className="text-sm text-slate-7 mb-4">
							or click to browse (10MB max)
						</p>
						<Button
							disabled={disabled}
							variant="outline"
							className="overflow-hidden relative"
							type="button">
							Select PDF
							<input
								type="file"
								accept=".pdf,application/pdf"
								value=""
								className="absolute top-0 left-0 opacity-0 z-[2] w-full h-full cursor-pointer"
								onChange={handleFileChange}
							/>
						</Button>
					</>
				) : (
					<div className="w-full">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<File className="h-8 w-8 text-gray-400 mr-3" />
								<div className="text-left">
									<p className="text-sm font-medium text-gray-200 truncate max-w-[180px]">
										{file.name}
									</p>
									<p className="text-xs text-gray-400">
										{(file.size / (1024 * 1024)).toFixed(2)} MB
									</p>
								</div>
							</div>
							<Button
								disabled={disabled}
								variant="ghost"
								size="icon"
								onClick={(e) => {
									e.stopPropagation();
									removeFile();
								}}
								className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-800">
								<X className="h-4 w-4" />
								<span className="sr-only">Remove file</span>
							</Button>
						</div>
					</div>
				)}
			</div>

			{error && <FormError message={error} />}
		</div>
	);
}
