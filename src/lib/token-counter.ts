import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({
	model: 'gem',
});

export async function estimateFileTokens(file: File): Promise<number> {
	try {
		const text = await file.text(); // Read file content (if it's text-based)

		const tokenCountResponse = await model.countTokens([{ text }]);
		return tokenCountResponse.totalTokens;
	} catch (error) {
		console.error('Error reading file:', error);
		return 0;
	}
}

export const creditsToOutput =  (credits: number) => {
	// Reverse the calculation from usedTokensUpdate.
	const outputPrice = (credits * 15) / 2000000;
	const output = Math.floor((outputPrice / 1.4) * 1000000);
	return output;
};
