"use client";
import LoadingPage from "@/components/layout/loading-page";
import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import StepForm from "@/features/onboarding/components/step-form";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OnboardingPage = () => {
	const router = useRouter();
	const { data, isPending } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	useEffect(() => {
		if (data) {
			if (data.user.onboarding) {
				router.replace("/onboarding");
			}
			if (!data.user.subscription && !data.user.onboarding) {
				router.replace("/limited-pricing");
			}
		}
	}, [data, router]);
	if (!isPending) {
		return <LoadingPage message="Onboarding..." />;
	}
	return (
		<div className="relative flex min-h-screen p-6 w-screen items-center justify-center overflow-hidden md:p-0">
			<div className="absolute z-10 size-full bg-linear-to-b from-[#141414] via-[#141414] via-70% to-transparent" />
			<Image
				src="/images/auth/bottom-background.png"
				fill
				className="object-cover"
				alt="Background"
			/>
			<StepForm />
		</div>
	);
};

export default OnboardingPage;
