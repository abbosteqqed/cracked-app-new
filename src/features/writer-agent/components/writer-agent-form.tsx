"use client";
import React, { Suspense, lazy } from "react";

import { WRITER_STEP_ITEMS } from "../contstant/steps";
import { useWriterAgent } from "../hooks/use-writer-agent";
import AgentFormTabs from "@/components/agents/agent-form-tabs";
const WriterPersonaForm = lazy(() => import("./writer-persona-form"));
const WriterKnowledgeForm = lazy(() => import("./writer-knowledge-form"));
const WriterInstructionForm = lazy(() => import("./writer-instruction-form"));
const WriterOutputForm = lazy(() => import("./writer-output-form"));

const WriterAgentStepForm = () => {
	const {
		activeTab,
		data,
		setActiveTab,
		handlePersonaChange,
		setData,
		onSubmit,
		error,
		success,
		isPending,
	} = useWriterAgent();

	// Render step forms
	const renderForm = () => {
		switch (activeTab) {
			case 1:
				return (
					<WriterPersonaForm
						defaultValues={data.persona}
						onChange={(val) => {
							handlePersonaChange(val);
							setActiveTab(2);
						}}
					/>
				);
			case 2:
				return <WriterKnowledgeForm onContinue={() => setActiveTab(3)} />;
			case 3:
				return (
					<WriterInstructionForm
						setData={setData}
						instructions={data.instructions}
						onContinue={() => setActiveTab(4)}
					/>
				);
			case 4:
				return (
					<WriterOutputForm
						setData={setData}
						onSubmit={onSubmit}
						tasks={data.tasks}
						error={error}
						success={success}
						disabled={isPending}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="grid grid-cols-[144px_1fr] gap-4">
			<AgentFormTabs
				disabled={isPending}
				tabs={WRITER_STEP_ITEMS}
				activeId={activeTab}
				handleChangeTab={setActiveTab}
			/>
			<Suspense fallback={<div>Loading form...</div>}>{renderForm()}</Suspense>
		</div>
	);
};

export default WriterAgentStepForm;
