import PdfAgentForm from "@/features/pdf-agent/components/pdf-agent-form";
import PdfAgentFormLoding from "@/features/pdf-agent/components/pdf-agent-form-loading";
import React, { Suspense } from "react";

const PdfAgentPage = () => {
	return (
		<div className="w-full">
			<h1 className="md:text-4xl text-2xl font-bold">
				Chat with Your PDFs Instantly.
			</h1>
			<p className="text-sm text-white/70 mt-3 mb-6">
				Upload your document below and start a conversation with our AI-powered
				PDF Agent.
			</p>
			<Suspense fallback={<PdfAgentFormLoding />}>
				<PdfAgentForm />
			</Suspense>
		</div>
	);
};

export default PdfAgentPage;
