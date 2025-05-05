import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { redirect } from "next/navigation";
import React from "react";

interface AppLayoutProps {
	children?: React.ReactNode;
}

const AppLayout = async ({ children }: AppLayoutProps) => {
	const res = await getCurrentUser();

	if (!res) {
		return redirect("/auth/sigin");
	}

	if (res && res.user.onboarding) {
		return redirect("/onboarding");
	}
	return <>{children}</>;
};

export default AppLayout;
