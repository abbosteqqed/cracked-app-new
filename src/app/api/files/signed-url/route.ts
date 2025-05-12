import { NextResponse } from "next/server";
import { getR2SignedUrlAction } from "@/lib/cloudflare-r2";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const oldUrl = searchParams.get("oldUrl");

		if (!oldUrl) {
			return NextResponse.json({ error: "Missing old URL" }, { status: 400 });
		}

		if (!oldUrl) {
			return NextResponse.json({ error: "Missing old URL" }, { status: 400 });
		}

		const result = await getR2SignedUrlAction(oldUrl);

		return NextResponse.json(result);
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
