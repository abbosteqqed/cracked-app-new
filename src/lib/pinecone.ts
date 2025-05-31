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

// PDF
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

// YOUTUBE
export const saveYoutubeTranscriptToPinecone = async (
	videoId: string,
	transcriptEntries: { text: string; timestamp: string }[]
) => {
	try {
		const documents: {
			pageContent: string;
			metadata: {
				videoId: string;
				timestamp_start: string;
				timestamp_end: string;
			};
		}[] = [];

		const CHUNK_SIZE = 50;

		for (let i = 0; i < transcriptEntries.length; i += CHUNK_SIZE) {
			const chunk = transcriptEntries.slice(i, i + CHUNK_SIZE);
			const chunkText = chunk.map((entry) => entry.text).join(" ");
			const firstEntry = chunk[0];
			const lastEntry = chunk[chunk.length - 1];

			documents.push({
				pageContent: chunkText,
				metadata: {
					videoId: videoId,
					timestamp_start: firstEntry.timestamp,
					timestamp_end: lastEntry.timestamp,
				},
			});
		}

		await PineconeStore.fromDocuments(documents, embeddings, {
			pineconeIndex,
			namespace: videoId,
		});
	} catch (e) {
		throw e;
	}
};

export const getYoutubeTranscriptStore = async (
	videoId: string,
	query: string
) => {
	try {
		const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
			pineconeIndex,
			namespace: videoId,
		});

		const results = await vectorStore.similaritySearch(query, 4);

		console.log(
			`Found ${results.length} relevant segments for video ${videoId}.`
		);
		return results;
	} catch (e) {
		console.error(
			`Error querying transcript for video ${videoId} from Pinecone:`,
			e
		);
		throw e;
	}
};

export function getLastSixMessages<T>(messages: T[]): T[] {
	if (messages.length > 6) {
		return messages.slice(messages.length - 6);
	} else {
		return messages;
	}
}
