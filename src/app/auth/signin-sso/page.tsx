import SignInWithOtpForm from "@/features/auth/components/sigin-with-otp-form";
import React, { Suspense } from "react";

const SinginSSOPage = () => {
	return (
		<Suspense>
			<SignInWithOtpForm />
		</Suspense>
	);
};

export default SinginSSOPage;
