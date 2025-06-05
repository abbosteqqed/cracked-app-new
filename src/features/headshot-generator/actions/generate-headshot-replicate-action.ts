"use server";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import { replicate } from "@/lib/replicate";

export const generateHeadshotsReplicateAction = async (img: string) => {
	try {
		const user = await getCurrentUser();
		if (!user) {
			throw Error("User unauthorized");
		}
		if (
			!user.subscription ||
			user.subscription.name.toLowerCase() === "free" ||
			!user.credits
		) {
			throw Error("Only premium users run the feature");
		}

		if (user.credits.totalCredits < 10000) {
			throw Error("You have not enough credits run the generate image");
		}
		const input = {
			background: "office",
			input_image: img,
			aspect_ratio: "1:1",
		};

		const output = await replicate.run(
			"flux-kontext-apps/professional-headshot",
			{ input }
		);

		const url = (output as { url: () => { href: string } }).url();

		return {
			url: url.href,
		};
	} catch (error) {
		throw error;
	}
};
