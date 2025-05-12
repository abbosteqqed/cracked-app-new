/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import cuid from "cuid";
import { ChangeEvent } from "react";
import { toast } from "sonner";
import * as cheerio from "cheerio";
import { useKnowledge } from "@/lib/context/knowledge-provider";

export const useKnowledgeForm = () => {
	const { state, dispatch } = useKnowledge();
	const { knowledges, files, isPending, websiteUrl } = state;

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files);
			dispatch({ type: "SET_IS_PENDING", payload: true });

			const uniqueFiles = newFiles.filter(
				(newFile) =>
					newFile.type === "application/pdf" &&
					!files.some((existingFile) => existingFile.name === newFile.name)
			);

			dispatch({ type: "SET_FILES", payload: [...files, ...uniqueFiles] });

			const uploadedKnowledges = await Promise.all(
				uniqueFiles.map(async (file) => {
					const formData = new FormData();
					formData.append("file", file);
					try {
						const response = await axios.post("/api/files/upload", formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						});

						const { url, name } = response.data;
						return {
							id: cuid(),
							type: "pdffile" as const,
							fileUrl: url,
							name: name,
							tokens: 0,
						};
					} catch (error) {
						console.error("Failed to upload file:", error);
						return null;
					}
				})
			);

			dispatch({
				type: "SET_KNOWLEDGES",
				payload: [
					...knowledges,
					...uploadedKnowledges.filter((knowledge) => knowledge !== null),
				],
			});
			dispatch({ type: "SET_IS_PENDING", payload: false });
		}
	};

	const handleWebsiteSync = async () => {
		dispatch({ type: "SET_IS_PENDING", payload: true });
		try {
			const response = await axios.get(websiteUrl);
			const html = response.data;
			const $ = cheerio.load(html);

			const textContent = $("p, h1, h2, h3, h4, h5, h6").text();

			dispatch({
				type: "ADD_KNOWLEDGE",
				payload: {
					id: cuid(),
					type: "website" as const,
					websiteContent: textContent,
					name: websiteUrl,
					fileUrl: websiteUrl,
					tokens: 0,
				},
			});
			dispatch({ type: "SET_WEBSITE_URL", payload: "" });
		} catch (error: any) {
			console.error("Failed to sync website:", error);
			toast.error(error.message);
		}
		dispatch({ type: "SET_IS_PENDING", payload: false });
	};

	const deleteKnowledgeItem = async (id: string) => {
		const knowledge = knowledges.find((item) => item.id);
		if (knowledge) {
			if (knowledge.type === "website") {
				dispatch({ type: "REMOVE_KNOWLEDGE", payload: id });
			}
			if (knowledge.type === "pdffile") {
				try {
					await axios.post("/api/files/delete", { filename: knowledge.name });
				} catch (e: any) {
					toast.error(e.message);
				}
				dispatch({ type: "REMOVE_KNOWLEDGE", payload: id });
			}
		}
	};

	const handleChangeWebsiteUrl = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: "SET_WEBSITE_URL", payload: e.target.value });
	};

	return {
		handleChangeWebsiteUrl,
		deleteKnowledgeItem,
		handleWebsiteSync,
		handleFileChange,
		isPending,
		knowledges,
		websiteUrl,
	};
};
