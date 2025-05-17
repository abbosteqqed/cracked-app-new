import AppNavbar from "@/components/layout/app-navbar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "sonner";

interface AppLayoutProps {
	children?: React.ReactNode;
}

const AppLayout = async ({ children }: AppLayoutProps) => {
	const user = await getCurrentUser();
	if (!user) {
		return redirect("/auth/signin");
	}

	if (user.onboarding) {
		return redirect("/onboarding");
	}

	if (!user.subscription) {
		return redirect("/limited-pricing");
	}

	return (
		<>
			<>
				<AppNavbar
					subscription={user.subscription}
					credits={user.credits}
				/>
				<div className="w-full px-6">{children}</div>
				<Toaster />
			</>
		</>
	);
};

export default AppLayout;
