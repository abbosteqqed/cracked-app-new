"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export const usedTokensUpdate = async (
	input: number,
	output: number,
	userId: string
) => {
	const inputPrice = (input / 1000000) * 0.4;
	const outputPrice = (output / 1000000) * 1.4;
	const totalPrice = inputPrice + outputPrice;
	const credits = Math.ceil((totalPrice * 2000000) / 14);

	const existingTokes = await db.credits.findUnique({
		where: {
			userId,
		},
	});

	if (!existingTokes) {
		redirect("/app/pricing");
	}

	if (existingTokes.totalCredits > credits) {
		const newCredits = existingTokes.totalCredits - credits;
		await db.credits.update({
			where: {
				id: existingTokes.id,
			},
			data: {
				totalCredits: newCredits,
			},
		});
	} else {
		await db.credits.update({
			where: {
				id: existingTokes.id,
			},
			data: {
				totalCredits: 0,
			},
		});
	}

	const tokens = await db.credits.findUnique({
		where: {
			userId,
		},
	});

	return {
		tokens: tokens?.totalCredits,
	};
};