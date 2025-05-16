"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { SIGN_IN_WITH_OTP_LINK } from "@/lib/constants/links";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlinePassword } from "react-icons/md";

interface AuthWrapperProps {
	children?: React.ReactNode;
	title: string;
	subtitle?: React.ReactNode;
	showSocials?: boolean;
}

const AuthWrapper = ({
	children,
	title,
	subtitle,
	showSocials = false,
}: AuthWrapperProps) => {
	const handleGoogleSignin = async () => {
		await authClient.signIn.social({ provider: "google" });
	};
	return (
		<div className="flex flex-col w-full max-w-[448px]">
			<h1 className="text-xl tracking-[-0.16px] text-slate-12 font-bold mb-1.5 mt-8 text-center sm:text-left">
				{title}
			</h1>
			{subtitle && (
				<p className="text-base text-slate-11 font-normal mb-8 text-center sm:text-left">
					{subtitle}
				</p>
			)}
			{children}
			{showSocials && (
				<>
					<div className="flex items-center w-full gap-2 my-6">
						<div className="flex-1 h-[1px] bg-slate-6"></div>
						<span className="text-slate-8 text-sm">OR</span>
						<div className="flex-1 h-[1px] bg-slate-6"></div>
					</div>
					<div className="flex flex-col gap-4">
						<Button
							onClick={handleGoogleSignin}
							variant="outline">
							<FcGoogle /> Login With Google
						</Button>
						<a
							href={SIGN_IN_WITH_OTP_LINK}
							className="w-full">
							<Button
								type="button"
								className="w-full"
								variant="outline">
								<MdOutlinePassword /> Login With OTP
							</Button>
						</a>
					</div>
				</>
			)}
		</div>
	);
};

export default AuthWrapper;
