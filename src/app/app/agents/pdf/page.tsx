import PdfAgentForm from "@/features/pdf-agent/components/pdf-agent-form";
import PdfAgentFormLoding from "@/features/pdf-agent/components/pdf-agent-form-loading";
import React, { Suspense } from "react";

const PdfAgentPage = () => {
	return (
		<div className="w-full">
			
			<Suspense fallback={<PdfAgentFormLoding />}>
				<PdfAgentForm />
			</Suspense>
		</div>
	);
};

export default PdfAgentPage;
