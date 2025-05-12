"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import Logo from "./logo";
import NavbarRight from "./navbar-right";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "../ui/skleton";

const AppNavbar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { data, isPending } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	useCallback(() => {
		if (data) {
			if (data.user.onboarding) {
				router.replace("/onboarding");
			}
			if (!data.user.subscription && !data.user.onboarding) {
				router.replace("/limited-pricing");
			}
		}
	}, [data]);

	if (pathname.startsWith("/app/agents")) {
		return (
			<>
				<div className="p-7 w-full">
					<Link
						href="/app"
						className="text-white/50 text-sm hover:text-white transition-colors">
						Cancel
					</Link>
				</div>
			</>
		);
	}
	return (
		<div className="relative w-full bg-primary-bg py-4">
			<div className="max-w-5xl flex items-center justify-between mx-auto">
				<Link
					href="/app"
					aria-label="App Home">
					<Logo />
				</Link>
				{isPending && (
					<div className="flex items-center gap-4">
						<Skeleton className="w-[60px] h-8 rounded-full" />
						<Skeleton className="w-[120px] h-8 rounded-full" />
						<Skeleton className="w-10 h-10 rounded-full" />
					</div>
				)}
				{data && (
					<NavbarRight
						subscription={data.user.subscription}
						credits={data.user.credits}
					/>
				)}
			</div>
		</div>
	);
};

export default AppNavbar;
