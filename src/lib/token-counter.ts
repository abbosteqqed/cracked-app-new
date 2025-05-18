

export const creditsToOutput =  (credits: number) => {
	// Reverse the calculation from usedTokensUpdate.
	const outputPrice = (credits * 15) / 2000000;
	const output = Math.floor((outputPrice / 1.4) * 1000000);
	return output;
};
