"use client";
import React from "react";
import Link from "next/link";
import Logo from "./logo";
import NavbarRight from "./navbar-right";

import { usePathname } from "next/navigation";

interface AppNavbarProps {
	user: {
		id: string;
		subscription: {
			name: string;
		} | null;
		credits: {
			totalCredits: number;
		} | null;
		email: string;
		onboarding: boolean;
		customerId: string | null;
	};
}

const AppNavbar = ({ user }: AppNavbarProps) => {
	const pathname = usePathname();

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
				<NavbarRight
					subscription={user.subscription}
					credits={user.credits}
				/>
			</div>
		</div>
	);
};

export default AppNavbar;
