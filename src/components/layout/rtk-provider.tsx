"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RTKProvider = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 0,
					},
				},
			})
	);
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default RTKProvider;
