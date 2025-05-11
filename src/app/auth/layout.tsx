import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex justify-center items-center min-h-screen w-full px-6 pb-6 pt-20">
			<div className="fixed top-0 left-0 w-full h-20 flex items-center px-6">
				<Link href="/">
					<Button
						type="button"
						variant={"ghost"}>
						<ChevronLeft className="size-4" />
						Home
					</Button>
				</Link>
			</div>
			{children}
		</main>
	);
};

export default AuthLayout;
