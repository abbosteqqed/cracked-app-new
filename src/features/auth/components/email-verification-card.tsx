"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState, useTransition } from "react";
import AuthWrapper from "./auth-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { emailVerification } from "../actions/email-verification";

const EmailVerification = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	const token = searchParams.get("token");
	useEffect(() => {
		startTransition(() => {
			emailVerification(token).then((res) => {
				if (res.error) {
					setSuccessMessage(null);
					setErrorMessage(res.error);
				}
				if (res.success) {
					setErrorMessage(null);
					setSuccessMessage(res.message);
				}
			});
		});
	}, [token]);
	return (
		<AuthWrapper
			title="Verify Your Email Address"
			subtitle={<>Confirm your email to activate your account.</>}>
			<>
				{successMessage && (
					<div className="flex items-center justify-between py-6 flex-col w-full gap-4">
						<p className="text-center text-green-500">{successMessage}</p>{" "}
						<Button
							disabled={isPending}
							onClick={() => router.push("/auth/signin")}
							className="w-full"
							type="button">
							<span>Proceed to Login</span>
							<ArrowRight className="size-4" />
						</Button>
					</div>
				)}
				{errorMessage && (
					<div className="flex items-center justify-between py-6 flex-col w-full gap-4">
						<p className="text-center text-red-500">
							{errorMessage === "token_expired"
								? "Your verification token has expired."
								: errorMessage === "invalid_token"
									? "The verification link is invalid. Please check your email or request a new link."
									: errorMessage}{" "}
						</p>

						{errorMessage !== "Your verification token has expired." &&
							errorMessage !==
								"The verification link is invalid. Please check your email or request a new link." && (
								<Button
									disabled={isPending}
									onClick={() => router.push("/auth/send-email-verification")}
									className="w-full"
									type="button">
									<span>Request New Verification Email</span>{" "}
									<ArrowRight className="size-4" />
								</Button>
							)}

						<Button
							disabled={isPending}
							onClick={() => router.push("/auth/signin")}
							className="w-full"
							type="button"
							variant="outline">
							<span>Back to Login</span> <ArrowRight className="size-4" />
						</Button>
					</div>
				)}
				{isPending && (
					<div className="flex items-center justify-between py-6 flex-col w-full gap-4">
						<p className="text-center text-slate-10">
							Verifying your email address...
						</p>{" "}
					</div>
				)}
			</>
		</AuthWrapper>
	);
};

const EmailVerificationCard = () => {
	return (
		<Suspense>
			<EmailVerification />
		</Suspense>
	);
};

export default EmailVerificationCard;
