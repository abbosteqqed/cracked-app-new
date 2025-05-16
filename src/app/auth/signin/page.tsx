import SigninEmailPasswordForm from "@/features/auth/components/signin-email-password-form";
import React, { Suspense } from "react";

const SignInPage = () => {
	return (
		<Suspense>
			<SigninEmailPasswordForm />
		</Suspense>
	);
};

export default SignInPage;
