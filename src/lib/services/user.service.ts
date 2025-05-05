import db from "../db";

// Get User By Id
export const getUserById = async (id: string) => {
	return await db.user.findUnique({
		where: {
			id,
		},
	});
};
