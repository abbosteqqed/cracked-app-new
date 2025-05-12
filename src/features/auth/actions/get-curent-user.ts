"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers as NextHeaders } from "next/headers";

/**
 * Retrieves the current authenticated user with their subscription and credit information
 * @returns {Promise<{user: User} | null>} The user object or null if not authenticated
 */
export const getCurrentUser = async () => {
	try {
		const headers = await NextHeaders();

		// Get session
		const session = await auth.api.getSession({
			headers,
		});

		// If no session, sign out and return null
		if (!session) {
			try {
				await auth.api.signOut({ headers });
			} catch (signOutError) {
				console.error("Error signing out:", signOutError);
			}
			return null;
		}

		// Fetch user with subscription and credit info
		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
			select: {
				id: true,
				email: true,
				onboarding: true,
				customerId: true,
				subscription: {
					select: {
						name: true,
						status: true,
						endDate: true,
					},
				},
				credits: {
					select: {
						totalCredits: true,
					},
				},
			},
		});

		// If user not found in DB, sign out and return null
		if (!user) {
			try {
				await auth.api.signOut({ headers });
			} catch (signOutError) {
				console.error("Error signing out:", signOutError);
			}
			return null;
		}

		return { user };
	} catch (error) {
		console.error("Error in getCurrentUser:", error);
		return null;
	}
};
