import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WriterAgentInitialDataDTO } from "@/types/agents/writer";

import { Plus, Trash } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface WriterInstructionForm {
	instructions: string[];
	setData: Dispatch<SetStateAction<WriterAgentInitialDataDTO>>;
	onContinue: () => void;
}

const WriterInstructionForm = ({
	instructions,
	onContinue,
	setData,
}: WriterInstructionForm) => {
	const handleChangeInstruction = ({
		text,
		index,
	}: {
		text: string;
		index: number;
	}) => {
		const newInstructions = instructions;
		instructions[index] = text;
		setData((prev) => ({ ...prev, instructions: newInstructions }));
	};

	const addInstruction = () => {
		const newInstructions = [...instructions, ``];
		setData((prev) => ({ ...prev, instructions: newInstructions }));
	};

	const deleteInstruction = (index: number) => {
		const newInstructions = instructions.filter((item, i) => i !== index);
		setData((prev) => ({ ...prev, instructions: newInstructions }));
	};
	return (
		<div className="w-full grid h-max gap-6">
			<div className="w-full grid gap-3">
				<span>Instructions</span>
				<p className="text-sm text-white/50">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ad
					accusamus et. Dolorem, harum aliquid aliquam facere ad corrupti.
				</p>
			</div>
			<div className="grid gap-2">
				{instructions.map((instruction, index) => (
					<div
						key={index + "-instruction"}
						className="relative group">
						<Textarea
							rows={5}
							value={instruction}
							onChange={(e) =>
								handleChangeInstruction({ text: e.target.value, index })
							}
							className="appearance-none resize-none"
							placeholder="I need help with engaging my audience on social media. Can you suggest creative ways to communicate effectively?"
						/>
						<button
							type="button"
							onClick={() => deleteInstruction(index)}
							className="shrink-0 top-1 invisible group-hover:visible right-1 rounded-md shadow-sm size-8 flex justify-center items-center backdrop-blur-sm bg-white/10 text-white/60 hover:text-white absolute duration-200">
							<Trash className="size-4" />
						</button>
					</div>
				))}

				<Button
					type="button"
					onClick={addInstruction}
					className="w-max mt-2">
					<Plus className="size-4" /> Add
				</Button>
			</div>
			<Button
				type="button"
				onClick={onContinue}
				variant="secondary"
				className="w-max">
				Continue
			</Button>
		</div>
	);
};

export default WriterInstructionForm;
