import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { authApiPrefix, authRoutes, publicRoutes } from "./lib/constants/route";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (publicRoutes.includes(pathname)) {
		return NextResponse.next();
	}

	if (pathname.startsWith(authApiPrefix)) {
		return NextResponse.next();
	}

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		}
	);

	if (!session && !authRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/auth/signin", request.url));
	}

	if (session && authRoutes.includes(pathname)) {
		console.log("Authenticated user accessing auth route, redirecting to /app");
		return NextResponse.redirect(new URL("/app", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
