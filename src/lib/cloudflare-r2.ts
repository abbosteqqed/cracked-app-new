"use server"
import {
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cuid from "cuid";
import { cloudflareR2, r2Client } from "./constants/clouflare-r2";
import { redis } from "./redis";
import { FileUploadResult } from "@/types/file";

export const getSignedCloudflareUrl = async (
	filename: string
): Promise<string> => {
	if (!filename) {
		throw new Error("Filename is required");
	}

	const cacheKey = `signedUrl:${filename}`;
	const cachedUrl = await redis.get(cacheKey);

	if (cachedUrl) {
		return cachedUrl as string;
	}

	const getObjectCommand = new GetObjectCommand({
		Bucket: cloudflareR2.bucket,
		Key: filename,
	});

	const signedUrl = await getSignedUrl(r2Client, getObjectCommand, {
		expiresIn: cloudflareR2.expiresIn,
	});

	// Store the signed URL in Redis with an expiration time
	await redis.set(cacheKey, signedUrl, { ex: cloudflareR2.expiresIn });

	return signedUrl;
};

export async function uploadFileToR2(file: File): Promise<FileUploadResult> {
	if (!file) {
		throw new Error("File is required");
	}

	const id = cuid();
	const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
	const filename = `${id}-${safeFilename}`;

	try {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const putObjectCommand = new PutObjectCommand({
			Bucket: cloudflareR2.bucket, // Use the bucket from constants
			Key: filename,
			Body: buffer,
			ContentType: file.type,
		});

		await r2Client.send(putObjectCommand);
		const url = await getSignedCloudflareUrl(filename);

		return {
			url,
			pathname: filename,
			contentType: file.type,
			name: filename,
		};
	} catch (error) {
		console.error("Error uploading to R2:", error);
		throw new Error(
			`Failed to upload file: ${error instanceof Error ? error.message : "Unknown error"}`
		);
	}
}

export async function getR2SignedUrlAction(
	filename: string
): Promise<{ url: string | null; error?: string }> {
	if (!filename) {
		return { url: null, error: "Filename is required" };
	}

	try {
		const url = await getSignedCloudflareUrl(filename);
		return { url };
	} catch (error) {
		console.error("R2 signed URL generation error:", error);
		return {
			error: `Failed to generate signed URL: ${error instanceof Error ? error.message : "Unknown error"}`,
			url: null,
		};
	}
}

export async function removeFileFromR2(filename: string): Promise<void> {
	try {
		const deleteObjectCommand = new DeleteObjectCommand({
			Bucket: cloudflareR2.bucket,
			Key: filename,
		});

		await r2Client.send(deleteObjectCommand);
		console.log(`File "${filename}" deleted successfully from R2.`);
	} catch (error) {
		console.error(`Error deleting file "${filename}" from R2:`, error);
		throw new Error(
			`Failed to delete file "${filename}" from R2: ${
				error instanceof Error ? error.message : "Unknown error"
			}`
		);
	}
}
