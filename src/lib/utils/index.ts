import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Message } from "ai";
import { convertToUIMessage } from "./convert-ui-to-messages";
import { DbMessageWithAttachements } from "@/types/chat";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}



export const convertAIMessage = ({
	messages,
}: {
	messages: DbMessageWithAttachements[];
}): Array<Message> => {
	return messages.map((message) => {
		const convertedMessage = convertToUIMessage({
			...message,
		});
		return {
			...convertedMessage,
			experimental_attachments: message.experimental_attachments
				? message.experimental_attachments.map((attachment) => ({
						name: attachment.name === null ? undefined : attachment.name,
						contentType:
							attachment.contentType === null
								? undefined
								: attachment.contentType,
						url: attachment.url,
					}))
				: [],
		};
	});
};


export const downloadBase64AsJpg = (
	base64String: string,
	filename: string = "download.jpg"
): void => {

	const base64Data = base64String.includes(";base64,")
		? base64String.split(";base64,")[1]
		: base64String;


	const binaryString = window.atob(base64Data);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);


	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}


	const blob = new Blob([bytes], { type: "image/jpeg" });


	const url = URL.createObjectURL(blob);

	
	const link = document.createElement("a");
	link.href = url;
	link.download = filename.endsWith(".jpg") ? filename : `${filename}.jpg`;
	document.body.appendChild(link);


	link.click();


	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};


export const generateBase64 = async (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
};


export function downloadImageByUrl(
	url: string,
	filename = "downloaded-image.jpg"
) {
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to fetch image.");
			}
			return response.blob();
		})
		.then((blob) => {
			const blobUrl = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = filename;
			document.body.appendChild(link);
			link.click();
			link.remove();
			URL.revokeObjectURL(blobUrl); // Clean up
		})
		.catch((error) => {
			console.error("Error downloading image:", error);
		});
}
