import { getCurrentUser } from "@/features/auth/actions/get-curent-user";
import StepForm from "@/features/onboarding/components/step-form";
import Image from "next/image";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
	const res = await getCurrentUser();

	if (!res) {
		return redirect("/app");
	}

	if (res && !res.user.onboarding) {
		return redirect("/app");
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
