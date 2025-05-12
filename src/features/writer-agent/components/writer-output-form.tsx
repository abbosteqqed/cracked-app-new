import FormError from "@/components/fields/form-error";
import FormSuccess from "@/components/fields/form-success";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { WriterAgentInitialDataDTO } from "@/types/agents/writer";
import { Plus, Trash } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface WriterOutputTasksProps {
	tasks: string[];
	onSubmit: () => void;
	setData: Dispatch<SetStateAction<WriterAgentInitialDataDTO>>;
	error?: string;
	success?: string;
	disabled: boolean;
}

const WriterOutputTasks = ({
	onSubmit,
	tasks,
	setData,
	error,
	success,
	disabled,
}: WriterOutputTasksProps) => {
	const handleChangeTask = ({
		text,
		index,
	}: {
		text: string;
		index: number;
	}) => {
		const newTasks = tasks;
		tasks[index] = text;
		setData((prev) => ({ ...prev, tasks: newTasks }));
	};

	const addTask = () => {
		const newTasks = [...tasks, ``];
		setData((prev) => ({ ...prev, tasks: newTasks }));
	};

	const deleteTask = (index: number) => {
		const newTasks = tasks.filter((item, i) => i !== index);
		setData((prev) => ({ ...prev, tasks: newTasks }));
	};
	return (
		<div className="w-full grid h-max gap-6">
			<div className="w-full grid gap-3">
				<span>Task</span>
				<p className="text-sm text-white/50">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ad
					accusamus et. Dolorem, harum aliquid aliquam facere ad corrupti.
				</p>
			</div>
			<div className="grid gap-2">
				{tasks.map((task, index) => (
					<div
						key={index + "-instruction"}
						className="relative group">
						<Textarea
							disabled={disabled}
							rows={5}
							value={task}
							onChange={(e) =>
								handleChangeTask({ text: e.target.value, index })
							}
							className="appearance-none resize-none"
							placeholder="I need help with engaging my audience on social media. Can you suggest creative ways to communicate effectively?"
						/>
						<button
							type="button"
							disabled={disabled}
							onClick={() => deleteTask(index)}
							className="shrink-0 top-1 invisible group-hover:visible right-1 rounded-md shadow-sm size-8 flex justify-center items-center backdrop-blur-sm bg-white/10 text-white/60 hover:text-white absolute duration-200">
							<Trash className="size-4" />
						</button>
					</div>
				))}

				<Button
					type="button"
					onClick={addTask}
					className="w-max mt-2"
					disabled={disabled}>
					<Plus className="size-4" /> Add
				</Button>
			</div>
			<FormSuccess message={success} />
			<FormError message={error} />
			<Button
				type="button"
				disabled={disabled}
				onClick={onSubmit}
				variant="secondary"
				className="w-max">
				Continue
			</Button>
		</div>
	);
};

export default WriterOutputTasks;
