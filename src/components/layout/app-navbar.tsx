"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import NavbarRight from "./navbar-right";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";

const AppNavbar = () => {
	const router = useRouter();
	const { isPending, data } = useQuery({
		queryKey: ["currentUser"],
		queryFn: getCurrentUser,
	});
	const pathname = usePathname();

	useEffect(() => {
		if (data) {
			if (data.onboarding) {
				return router.replace("/onboarding");
			}

			if (!data.subscription) {
				return router.replace("/limited-pricing");
			}
		}
	});

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
	if (isPending) {
		return (
			<div className="relative w-full bg-primary-bg py-4 px-6">
				<div className="max-w-5xl flex items-center justify-between mx-auto">
					<Link
						href="/app"
						aria-label="App Home">
						<Logo />
					</Link>
				</div>
			</div>
		);
	}
	if (!data) {
		return null;
	}
	return (
		<div className="relative w-full bg-primary-bg py-4 px-6">
			<div className="max-w-5xl flex items-center justify-between mx-auto">
				<Link
					href="/app"
					aria-label="App Home">
					<Logo />
				</Link>

				<NavbarRight
					subscription={data.subscription}
					credits={data.credits}
				/>
			</div>
		</div>
	);
};

export default AppNavbar;
