"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelect from "@/components/ui/multiple-select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
	WriterAgentPersonaDTO,
	writerAgentPersonaSchema,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface WriterPersonaFormProps {
	defaultValues: WriterAgentPersonaDTO;
	onChange: (val: WriterAgentPersonaDTO) => void;
}

const WriterPersonaForm = ({
	defaultValues,
	onChange,
}: WriterPersonaFormProps) => {
	const form = useForm({
		resolver: zodResolver(writerAgentPersonaSchema),
		defaultValues,
	});
	const onSubmit = (values: WriterAgentPersonaDTO) => {
		onChange(values);
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid w-full gap-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									type="text"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									rows={3}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="style"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Style</FormLabel>
							<FormControl>
								<MultipleSelect
									value={field.value}
									options={STYLE_OPTIONS}
									onChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="complexity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Complexity</FormLabel>
							<FormControl>
								<MultipleSelect
									value={field.value}
									options={COMPLEXITY_OPTIONS}
									onChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tone</FormLabel>
							<FormControl>
								<MultipleSelect
									value={field.value}
									options={TONE_OPTIONS}
									onChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="flavour"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Flavour</FormLabel>
							<FormControl>
								<MultipleSelect
									value={field.value}
									options={FLAVOUR_OPTIONS}
									onChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="includePersonalProfile"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Include profile</FormLabel>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
									className="scale-100"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					variant="secondary"
					className="w-max mt-6">
					Continue
				</Button>
			</form>
		</Form>
	);
};

const STYLE_OPTIONS = [
	{
		value: "Casual",
		title: "Casual",
	},
	{
		value: "Formal",
		title: "Formal",
	},
];

const TONE_OPTIONS = [
	{
		value: "Serious",
		title: "Serious",
	},
	{
		value: "Funny",
		title: "Funny",
	},
];

const FLAVOUR_OPTIONS = [
	{
		value: "Dark humour",
		title: "Dark humour",
	},
	{
		value: "Sarcasm",
		title: "Sarcasm",
	},
];

const COMPLEXITY_OPTIONS = [
	{
		value: "Low",
		title: "Low",
	},
	{
		value: "Medium",
		title: "Medium",
	},
	{
		value: "High",
		title: "High",
	},
];

export default WriterPersonaForm;
