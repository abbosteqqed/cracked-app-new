import ForgotPasswordForm from "@/features/auth/components/forgot-password-form";
import React, { Suspense } from "react";

const ForgotPasswordPage = () => {
	return (
		<Suspense>
			<ForgotPasswordForm />
		</Suspense>
	);
};

export default ForgotPasswordPage;
