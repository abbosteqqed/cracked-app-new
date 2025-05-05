"use server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { getUserById } from "@/lib/services/user.service";
import {
	CreateProfileDTO,
	createProfileSchema,
} from "../validation/crate-profile.schema";
import { headers } from "next/headers";

export const createProfile = async (values: CreateProfileDTO) => {
	const validatedFields = createProfileSchema.safeParse(values);

	if (!validatedFields.success) {
		return {
			error: "Invalid fields!",
		};
	}
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session) {
			return {
				error: "Not authorized",
			};
		}
		const user = await getUserById(session.user.id!);

		if (!user) {
			return {
				error: "User not found",
			};
		}

		await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				onboarding: false,
				profile: {
					create: {
						...values,
					},
				},
			},
		});

		return {
			success: "Onboarding successfully skipped.",
		};
	} catch (e) {
		console.log(e);
		return {
			error: "Something went wrongly. Please check later.",
		};
	}
};
