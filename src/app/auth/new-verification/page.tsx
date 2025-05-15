import EmailVerificationCard from "@/features/auth/components/email-verification-card";
import React, { Suspense } from "react";

const NewVerificationPage = () => {
	return (
		<Suspense>
			<EmailVerificationCard />
		</Suspense>
	);
};

export default NewVerificationPage;
