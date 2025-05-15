import RegisterForm from "@/features/auth/components/register-form";
import React, { Suspense } from "react";

const Register = () => {
	return (
		<Suspense>
			<RegisterForm />
		</Suspense>
	);
};

export default Register;
