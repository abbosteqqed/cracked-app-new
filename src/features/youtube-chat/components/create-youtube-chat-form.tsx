"use client";
import { Button } from "@/components/ui/button";
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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createChatWithYoutube } from "../actions/create-chat-with-youtube";
import AgentFormWrapper from "@/components/agents/agent-form-wrapper";
import AgentFormHeading from "@/components/agents/agent-form-heading";

const youtubeVideoSchema = z.object({
	url: z
		.string()
		.url()
		.regex(
			/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|)([\w-]{11})((\?|&)\S*)?$/,
			"Invalid YouTube video URL."
		),
	title: z
		.string()
		.min(1, "Title cannot be empty.")
		.max(100, "Title cannot exceed 100 characters.")
		.refine(
			(title) => !/^\s*$/.test(title),
			"Title cannot be just whitespace."
		),
});

const CreateYoutubeChatForm = () => {
	const [isPending, startTransition] = React.useTransition();
	const form = useForm<z.infer<typeof youtubeVideoSchema>>({
		defaultValues: {
			url: "",
			title: "",
		},
		resolver: zodResolver(youtubeVideoSchema),
	});
	const onSubmit = async (data: z.infer<typeof youtubeVideoSchema>) => {
		startTransition(() => {
			createChatWithYoutube({
				videoId: data.url.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1] || "",
				title: data.title,
			})
				.then((chatId) => {
					window.location.href = `/app/chat-youtube/${chatId}`;
				})
				.catch((error) => {
					form.setError("root", { message: error.message });
				});
		});
	};
	return (
		<AgentFormWrapper
			isPending={true}
			activeId={1}
			handleChangeTab={() => {}}
			tabs={[{ id: 1, title: "Create Chat" }]}>
			<AgentFormHeading
				title="Chat with YouTube Video"
				description="Select a YouTube video and create a chat based on its transcript"
			/>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full flex flex-col gap-6">
					<FormField
						control={form.control}
						disabled={isPending}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Chat title..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						disabled={isPending}
						name="url"
						render={({ field }) => (
							<FormItem>
								<FormLabel>YouTube Video Url</FormLabel>
								<FormControl>
									<Input
										type="url"
										placeholder="Youtube video URL..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={isPending}
						type="submit"
						className="max-w-[120px]">
						{isPending ? "Creating chat..." : "Create chat"}
					</Button>
				</form>
			</Form>
		</AgentFormWrapper>
	);
};

export default CreateYoutubeChatForm;
