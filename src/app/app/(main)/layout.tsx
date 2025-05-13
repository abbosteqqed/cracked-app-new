import React from "react";

const HomeLayout = ({
	history,
	children,
}: {
	history: React.ReactNode;
	children: React.ReactNode;
}) => {
	return (
		<div className="mt-14 grid max-w-5xl mx-auto w-full">
			{children}
			{history}
		</div>
	);
};

export default HomeLayout;
