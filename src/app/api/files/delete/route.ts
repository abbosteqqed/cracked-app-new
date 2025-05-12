import { NextResponse } from "next/server";
import { removeFileFromR2 } from "@/lib/cloudflare-r2"; // Adjust the import path

export async function POST(request: Request) {
	try {
		const { filename } = await request.json();

		if (!filename) {
			return NextResponse.json(
				{ error: "Filename is required" },
				{ status: 400 }
			);
		}

		await removeFileFromR2(filename);

		return NextResponse.json({ message: "File deleted successfully" });
	} catch (error) {
		console.error("API Error deleting file:", error);
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
