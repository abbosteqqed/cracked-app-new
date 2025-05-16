import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
	return (
		<div className="flex items-center justify-center gap-6 flex-col py-10 px-6 h-[calc(100vh-68px)]">
			<h1 className="md:text-4xl text-3xl font-medium">Chat Not found</h1>
			<Link href="/app">
				<Button
					type="button"
					variant="outline">
					Go to Main Page
				</Button>
			</Link>
		</div>
	);
};

export default NotFound;
