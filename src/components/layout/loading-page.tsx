import React from "react";

interface LoadingPageProps {
	message: string;
}

const LoadingPage = ({ message }: LoadingPageProps) => {
	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div className="size-8 shrink-0  border-[3px] rounded-full border-brand" />{" "}
			<span className="text-white ml-3">{message}</span>
		</div>
	);
};

export default LoadingPage;
