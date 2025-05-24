"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PdfSelector from "./pdf-selector";
import { createPdfAgentChat } from "../actions/create-pdfagent-chat";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const pdfAgetSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Please enter a name with at least 2 characters." }) // Professionalized minimum length message
		.max(100, { message: "The name cannot exceed 100 characters." }), // Professionalized maximum length message
});

export type PDFAgentDTO = z.infer<typeof pdfAgetSchema>;

const PdfAgentForm = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [file, setFile] = useState<File | null>(null);
	const form = useForm({
		resolver: zodResolver(pdfAgetSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = (values: PDFAgentDTO) => {
		if (!file) {
			form.setError("root", { message: "PDF File is required" });
		} else {
			startTransition(() => {
				createPdfAgentChat({ name: values.name, file })
					.then((data) => {
						router.push(`/app/chat-pdf/${data.id}`);
					})
					.catch((e) => {
						toast.error(e.message);
					});
			});
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex flex-col">
				<FormField
					control={form.control}
					disabled={isPending}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Chat Name..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<PdfSelector
					disabled={isPending}
					file={file}
					setFile={setFile}
					errorMessage={form.formState.errors.root?.message}
				/>
				<Button
					disabled={isPending}
					type="submit"
					className="mt-10 max-w-[120px]">
					{isPending ? "Creating chat..." : "Create chat"}
				</Button>
			</form>
		</Form>
	);
};

export default PdfAgentForm;
