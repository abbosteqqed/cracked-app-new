
import { useKnowledge } from "@/lib/context/knowledge-provider";
import { WriterAgentInitialDataDTO } from "@/types/agents/writer";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { WriterAgentPersonaDTO } from "../schema";
import { createWriterChat } from "../actions/create-writer-agent";

const initialWriterData: WriterAgentInitialDataDTO = {
	persona: {
		name: "Writer",
		description:
			"An insightful, creative, and resourceful writing partner. Writer is here to help you brainstorm, structure, edit, and refine your written work.",
		style: "",
		complexity: "",
		tone: "",
		flavour: "",
		includePersonalProfile: false,
	},
	instructions: [
		`Brainstorming Ideas:
- Generate topic ideas for blog posts, articles, or creative writing.
- Provide outlines or structures for your writing.
- Offer unique angles or perspectives to make your work stand out.
		`,
		`Editing and Refining:
- Correct grammar, punctuation, and syntax.
- Enhance readability and flow.
- Suggest stylistic improvements to align with your desired tone.`,
		`Diverse Writing Styles:
- Adapt to various formats: essays, fiction, scripts, marketing copy, and more.
- Mimic specific tones: professional, casual, humorous, or poetic.`,
		`Inspiration and Motivation:
- Offer creative prompts to overcome writer's block.
- Share motivational quotes or advice for your writing journey.`,
	],
	tasks: [
		`I'm looking for inspiration for a blog post. Can you suggest 10 blog topics related to copywriting?`,
		`I need help with engaging my audience on social media. Can you suggest creative ways to communicate effectively?`,
	],
};

export const useWriterAgent = () => {
	const { state, dispatch } = useKnowledge();
	const [activeTab, setActiveTab] = useState(1);
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const [data, setData] =
		useState<WriterAgentInitialDataDTO>(initialWriterData);
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const handlePersonaChange = (val: WriterAgentPersonaDTO) => {
		setData((prev) => ({ ...prev, persona: val }));
	};

	const onSubmit = () => {
		setSuccess(() => undefined);
		setError(() => undefined);
		startTransition(() => {
			createWriterChat(data, state.knowledges)
				.then((res) => {
					if (res.error) {
						setError(res.error);
					} else {
						setSuccess(res.success);
						dispatch({ type: "RESET" });
						router.push(res.url!);
					}
				})
				.catch(() => setError(() => "Something went wrongly"));
		});
	};

	return {
		activeTab,
		data,
		setData,
		handlePersonaChange,
		setActiveTab,
		isPending,
		onSubmit,
		error,
		success,
	};
};
