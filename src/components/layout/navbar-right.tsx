import Image from "next/image";
import React from "react";
import UserDropdownMenu from "./user-dropdwon-menu";
import Link from "next/link";

interface NavbarRight {
	subscription: {
		name: string;
	} | null;
	credits: {
		totalCredits: number;
	} | null;
}

const NavbarRight = ({ subscription, credits }: NavbarRight) => {
	return (
		<div className="flex items-center gap-2">
			{subscription && (
				<Link
					href="/app/pricing"
					className="text-sm px-3 py-1 rounded-lg border border-slate-6 bg-slate-3 text-neutral-100">
					{subscription.name}
				</Link>
			)}
			{credits && (
				<Link
					href="/app/purchase-coins"

					className="flex items-center gap-2 px-3 py-1.5">
					<span className="text-sm ">{credits.totalCredits}</span>
					<Image
						src="/images/coin.svg"
						height={16}
						width={16}
						alt="Credits"
					/>
				</Link>
			)}
			<UserDropdownMenu />
		</div>
	);
};

export default NavbarRight;
