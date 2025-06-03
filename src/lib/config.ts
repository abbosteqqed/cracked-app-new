import z from "zod";

const stringRequired = z.string().trim().min(1);

const envSchema = z.object({
	BETTER_AUTH_SECRET: stringRequired,

	DATABASE_URL: stringRequired,

	NEXT_PUBLIC_WEBSITE_URL: stringRequired,

	RESEND_API_KEY: stringRequired,

	GOOGLE_CLIENT_ID: stringRequired,
	GOOGLE_CLIENT_SECRET: stringRequired,

	POLAR_ACCESS_TOKEN: stringRequired,
	POLAR_ACCESS: stringRequired,
	POLAR_WEBHOOK_SECRET: stringRequired,

	PUSHER_APP_ID: stringRequired,
	NEXT_PUBLIC_PUSHER_APP_KEY: stringRequired,
	PUSHER_APP_SECRET: stringRequired,

	CLOUDFLARE_ACCESS_KEY_ID: stringRequired,
	CLOUDFLARE_SECRET_ACCESS_KEY_ID: stringRequired,
	CLOUDFLARE_ENDPOINT: stringRequired,
	CLOUDFLAER_BUCKET_NAME: stringRequired,

	UPSTASH_REDIS_REST_URL: stringRequired,
	UPSTASH_REDIS_REST_TOKEN: stringRequired,

	GOOGLE_API_KEY: stringRequired,

	PINECONE_API_KEY: stringRequired,
	PINECONE_INDEX_NAME: stringRequired,

	OPENAI_API_KEY: stringRequired,

	REPLICATE_API_KEY: stringRequired,
});

export const env = envSchema.parse(process.env);
