"use client";
import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { ChevronDown, Gem, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { FadeLoader } from "react-spinners";
import GradientCircle from "../ui/gradient-circle";
import { authClient } from "@/lib/auth-client";

const UserDropdownMenu = () => {
	const [isSignOut, setIsSignOut] = useState(false);
	const route = useRouter();
	const handleSignOut = async () => {
		setIsSignOut(() => true);
		await authClient.signOut();
	};
	return (
		<>
			{isSignOut && (
				<div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-white/5 backdrop-blur-3xl z-999">
					<div className="flex items-center gap-4">
						<span className="font-medium">Login out...</span>{" "}
						<FadeLoader
							color="#fff"
							height={12}
							radius={5}
						/>
					</div>
				</div>
			)}
			<DropdownMenu>
				<DropdownMenuTrigger>
					<div className="flex gap-3 items-center">
						<GradientCircle />
						<ChevronDown className="size-4 text-white" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-48 gap- border-slate-6 bg-slate-3">
					<DropdownMenuItem onClick={() => route.push("/app/profile")}>
						<User className="size-4" />
						<span>Profile</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => route.push("/app/pricing")}>
						<Gem className="size-4" />
						<span>Pricing</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="focus:bg-red-800"
						onClick={handleSignOut}>
						<LogOut className="size-4" />
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default UserDropdownMenu;
