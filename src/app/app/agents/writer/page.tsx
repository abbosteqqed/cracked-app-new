'use cache'
import WriterAgentStepForm from "@/features/writer-agent/components/writer-agent-form";
import { KnowledgeProvider } from "@/lib/context/knowledge-provider";
import React from "react";

const WriteAgent = async() => {
	return (
		<KnowledgeProvider>
			<WriterAgentStepForm />
		</KnowledgeProvider>
	);
};

export default WriteAgent;
