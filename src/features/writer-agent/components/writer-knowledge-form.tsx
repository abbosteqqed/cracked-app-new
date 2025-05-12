"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import useToast
import { FileText, Link, Trash } from "lucide-react";
import { useKnowledgeForm } from "../hooks/use-knowledge-form";


interface WriterKnowledgeFormProps {
	onContinue: () => void;
}

const WriterKnowledgeForm = ({ onContinue }: WriterKnowledgeFormProps) => {
	const {
		knowledges,
		handleChangeWebsiteUrl,
		handleFileChange,
		handleWebsiteSync,
		isPending,
		deleteKnowledgeItem,
		websiteUrl,
	} = useKnowledgeForm();
	return (
		<div className="flex flex-col">
			<h2 className="text-2xl font-medium">Knowledge</h2>
			<p className="text-sm text-neutral-500 mt-2">
				After uploading documents, URLs, and third-party data sources into the
				knowledge base, the AI can use this content to respond to queries.
			</p>
			<div className="w-full border border-neutral-700 rounded-2xl mt-6">
				<div className="p-3 border-b border-b-neutral-700">
					<Input
						className="w-full rounded-lg"
						placeholder="Search existing knowledge"
					/>
				</div>
				<div className="p-3 min-h-20">
					{knowledges.length === 0 && (
						<div className="w-full h-20 min-h-full flex items-center justify-center text-center">
							<p className="text-sm text-neutral-500 max-w-[300px]">
								There is no list of knowledge that AI will use yet, search or
								add new.
							</p>
						</div>
					)}

					{knowledges.length > 0 && (
						<div className="grid w-full gap-2">
							{knowledges.map((item) => (
								<div
									key={item.name}
									className="grid gap-1">
									<div className="w-full grid grid-cols-[32px_1fr_32px] gap-2 items-center">
										<div className="bg-neutral-800 rounded h-8 w-8 grid place-content-center text-white">
											{item.type === "pdffile" ? (
												<FileText className="size-4" />
											) : (
												<Link className="size-4" />
											)}
										</div>
										<span className="w-full truncate text-sm">{item.name}</span>
										<Button
											className="h-8 w-8 p-0"
											variant="destructive"
											disabled={isPending}
											onClick={() => deleteKnowledgeItem(item.id)}>
											<Trash className="size-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-y-4 items-center mt-10">
				<div className="p-3 border border-neutral-700 w-full rounded-2xl">
					<Button
						className="w-full h-10 relative"
						disabled={isPending}>
						Upload file
						<input
							type="file"
							accept="application/pdf"
							multiple
							className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
							onChange={handleFileChange}
							disabled={isPending}
						/>
					</Button>
				</div>
				<span className="text-neutral-600 text-sm">OR</span>
				<div className="flex items-center gap-3 border border-neutral-700 p-3 w-full rounded-2xl">
					<Input
						placeholder="Enter URL"
						className="flex-1"
						value={websiteUrl}
						onChange={handleChangeWebsiteUrl}
						disabled={isPending}
					/>
					<Button
						className="h-full"
						onClick={handleWebsiteSync}
						disabled={isPending}>
						Sync Website
					</Button>
				</div>
			</div>
			<Button
				type="button"
				onClick={onContinue}
				variant="secondary"
				className="w-max mt-10"
				disabled={isPending}>
				Continue
			</Button>
		</div>
	);
};

export default WriterKnowledgeForm;
