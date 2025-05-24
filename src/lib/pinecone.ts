import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./config";

const pinecone = new Pinecone({
	apiKey: env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index(env.PINECONE_INDEX_NAME);

const embeddings = new OpenAIEmbeddings({
	openAIApiKey: env.OPENAI_API_KEY,
	dimensions: 1024,
	modelName: "text-embedding-3-small",
});

export const savePdfToPinecone = async (filename: string, urlPdf: string) => {
	try {
		const response = await fetch(urlPdf);

		const blob = await response.blob();
		const loader = new PDFLoader(blob, {
			splitPages: false,
		});

		const pageLevelDocs = await loader.load();

		await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
			pineconeIndex,
			namespace: filename,
		});
	} catch (e) {
		throw e;
	}
};

export const getPdfStore = async (filename: string, message: string) => {
	const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
		pineconeIndex,
		namespace: filename,
	});

	const results = await vectorStore.similaritySearch(message, 4);
	return results;
};


export function getLastSixMessages<T>(messages: T[]): T[] {
	if (messages.length > 6) {
		// If there are more than 6 messages, slice the array to get the last 6.
		// messages.length - 6 calculates the starting index for the last 6 elements.
		return messages.slice(messages.length - 6);
	} else {
		// If there are 6 or fewer messages, return the original array as is.
		return messages;
	}
}
