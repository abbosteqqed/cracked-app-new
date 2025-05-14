import AppNavbar from "@/components/layout/app-navbar";
import React from "react";

interface AppLayoutProps {
	children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<>
			<>
				<AppNavbar />
				{children}
			</>
		</>
	);
};

export default AppLayout;
