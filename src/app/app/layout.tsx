import AppNavbar from "@/components/layout/app-navbar";
import React from "react";
import { Toaster } from "sonner";

interface AppLayoutProps {
	children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<>
			<>
				<AppNavbar />
				<div className="w-full px-6">{children}</div>
				<Toaster />
			</>
		</>
	);
};

export default AppLayout;
