import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../config";

export const cloudflareR2 = {
	chatAttachmentDirectoryName: "chat-attachments",
	agentAvatarDirectoryName: "agent-avatar",
	
	allowedMimeTypes: ["image/jpeg", "image/png", "application/pdf"],
	maxFileSizeMb: 5,
	expiresIn: 5 * 60 * 60,
	bucket: env.CLOUDFLAER_BUCKET_NAME,
} as const;

export const r2Client = new S3Client({
	region: "auto",
	endpoint: env.CLOUDFLARE_ENDPOINT as string,
	credentials: {
		accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID as string,
		secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY_ID as string,
	},
});
