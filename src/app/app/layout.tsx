import AppNavbar from "@/components/layout/app-navbar";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { redirect } from "next/navigation";
import React from "react";

interface AppLayoutProps {
	children?: React.ReactNode;
}

const AppLayout = async ({ children }: AppLayoutProps) => {
	const data = await getCurrentUser();
	if (!data) {
		return redirect("/auth/signin");
	}
	if (data.user.onboarding) {
		return redirect("/onboarding");
	}
	if (!data.user.subscription) {
		return redirect("/limited-pricing");
	}
	return (
		<>
			<>
				<AppNavbar user={{ ...data.user }} />
				{children}
			</>
		</>
	);
};

export default AppLayout;
