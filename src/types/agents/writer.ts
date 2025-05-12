import { KnowledgeType } from "@prisma/client";

export interface WriterAgentInitialDataDTO {
	persona: {
		name: string;
		description: string;
		style: string;
		complexity: string;
		tone: string;
		flavour: string;
		includePersonalProfile: boolean;
	};
	instructions: string[];
	tasks: string[];
}

export interface Knowledge {
	id: string;
	type: KnowledgeType;
	websiteContent?: string;
	fileUrl: string;
	name: string;
	tokens: number;
}
