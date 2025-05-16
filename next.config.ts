import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ hostname: "avatar.vercel.sh" },
			{ hostname: "*.r2.dev" },
			{ hostname: "*r2.cloudflarestorage.com" },
		],
	},
	skipTrailingSlashRedirect: true,
};

export default nextConfig;
