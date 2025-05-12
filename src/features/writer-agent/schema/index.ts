import * as z from "zod";

export const writerAgentPersonaSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().min(1, "Description is required"),
	style: z.string(),
	complexity: z.string(),
	tone: z.string(),
	flavour: z.string(),
	includePersonalProfile: z.boolean(),
});

export type WriterAgentPersonaDTO = z.infer<typeof writerAgentPersonaSchema>;
