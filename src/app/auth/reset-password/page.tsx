import ResetPasswordForm from "@/features/auth/components/reset-password-form";
import React, { Suspense } from "react";

const ResetPasswordPage = () => {
	return (
		<Suspense>
			<ResetPasswordForm />
		</Suspense>
	);
};

export default ResetPasswordPage;
