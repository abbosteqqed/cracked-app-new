import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import {
	authApiPrefix,
	authRoutes,
	webhookPrefix,
} from "./lib/constants/route";


export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (
		pathname.startsWith(authApiPrefix) ||
		pathname.startsWith(webhookPrefix)
	) {
		return NextResponse.next();
	}

	const session = getSessionCookie(request);

	if (!session && !authRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/auth/signin", request.url));
	}

	if (session && authRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/app", request.url));
	}

	if (session && pathname === "/") {
		return NextResponse.redirect(new URL("/app", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
