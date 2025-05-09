import React from "react";
import Link from "next/link";
import Logo from "./logo";
import NavbarRight from "./navbar-right";

interface AppNavbarProps {
	subscription: {
		name: string;
	} | null;
	credits: {
		totalCredits: number;
	} | null;
}

const AppNavbar = (props: AppNavbarProps) => {
	return (
		<div className="relative w-full bg-primary-bg py-4">
			<div className="max-w-5xl flex items-center justify-between mx-auto">
				<Link href="/app">
					<Logo />
				</Link>
				<NavbarRight {...props} />
			</div>
		</div>
	);
};

export default AppNavbar;
