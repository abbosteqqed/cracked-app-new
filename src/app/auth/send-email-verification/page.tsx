import EmailVerificationForm from "@/features/auth/components/email-verification-form";
import React, { Suspense } from "react";

const EmailVerificationPage = () => {
	return (
		<Suspense>
			<EmailVerificationForm />
		</Suspense>
	);
};

export default EmailVerificationPage;
