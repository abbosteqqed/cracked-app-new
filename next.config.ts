import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "avatar.vercel.sh" },
			{ hostname: "*.r2.dev" },
			{ hostname: "*r2.cloudflarestorage.com" },
		],
	},
	skipTrailingSlashRedirect: true,
	reactStrictMode: true,
	experimental: {
		serverActions: {
			bodySizeLimit: "50mb",
		},
	},
};

export default nextConfig;
