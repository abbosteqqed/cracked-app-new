import { S3Client } from "@aws-sdk/client-s3";

export const cloudflareR2 = {
	chatAttachmentDirectoryName: "chat-attachments",
	agentAvatarDirectoryName: "agent-avatar",
	baseUrl: process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL as string,
	allowedMimeTypes: ["image/jpeg", "image/png", "application/pdf"],
	maxFileSizeMb: 5,
	expiresIn: 5 * 60 * 60,
	bucket: "test-cracked",
} as const;

export const r2Client = new S3Client({
	region: "auto",
	endpoint: process.env.CLOUDFLARE_ENDPOINT as string,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY_ID as string,
	},
});
