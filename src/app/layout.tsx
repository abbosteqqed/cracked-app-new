import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Cracked",
	description: "Cracked is a simple and elegant way to manage your tasks.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable}`}>{children}</body>
		</html>
	);
}
