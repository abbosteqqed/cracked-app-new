import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "avatar.vercel.sh" },
			{ hostname: "*.r2.dev" },
			{ hostname: "*r2.cloudflarestorage.com" },
		],
	},
};

export default nextConfig;
