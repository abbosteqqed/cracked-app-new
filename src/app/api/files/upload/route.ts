/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { uploadFileToR2 } from "@/lib/cloudflare-r2";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File | null;

		if (!file) {
			return new NextResponse("No file uploaded", { status: 400 });
		}

		const uploadedFile = await uploadFileToR2(file);

		return NextResponse.json({
			...uploadedFile,
			message: "File uploaded successfully",
		});
	} catch (error: any) {
		console.error("UPLOAD API ERROR", error);
		return new NextResponse(error.message || "Internal Server Error", {
			status: 500,
		});
	}
}

export const config = {
	api: {
		bodyParser: false, // Disable default body parsing
	},
};
