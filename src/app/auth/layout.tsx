import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex justify-center items-center min-h-screen w-full">
			{children}
		</main>
	);
};

export default AuthLayout;
