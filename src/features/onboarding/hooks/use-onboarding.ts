import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { skipOnboarding } from "../actions/skip-onboarding";
import { createProfile } from "../actions/create-profile";

export interface ProfileDTO {
	age: string;
	gender: string | null;
	language: string;
	usedFor: string[];
}

const useOnboarding = () => {
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const [isPending, setTransition] = useTransition();
	const router = useRouter();
	const [profile, setProfile] = useState<ProfileDTO>({
		age: "",
		gender: "",
		language: "",
		usedFor: [],
	});

	const [step, setStep] = useState(1);

	const onClickBack = () => {
		setStep((prev) => prev - 1);
	};

	const onClickNext = () => {
		if (step === 5) {
			onSubmit();
		} else {
			setStep((prev) => prev + 1);
		}
	};

	const onSkip = () => {
		setSuccess(() => undefined);
		setError(() => undefined);
		setTransition(() => {
			skipOnboarding()
				.then((data) => {
					if (data.error) {
						setError(data.error);
					}
					if (data.success) {
						setSuccess(data.success);
					}
				})
				.catch(() => setError("Something went wrongly"));
		});
	};

	const isNextDisabled = useMemo(() => {
		if (step === 2 && profile.age.trim().length === 0) {
			return true;
		}

		if (step === 3 && profile.gender !== null && !profile.gender) {
			return true;
		}

		if (step === 4 && !profile.language) {
			return true;
		}

		if (step === 5 && profile.usedFor.length === 0) {
			return true;
		}

		return false;
	}, [step, profile]);

	const onSubmit = () => {
		setSuccess(() => undefined);
		setError(() => undefined);
		setTransition(() => {
			createProfile({
				age: Number(profile.age),
				gender: profile.gender,
				language: profile.language,
				usedFor: profile.usedFor.join(", "),
			})
				.then((data) => {
					if (data.error) {
						setError(data.error);
					}
					if (data.success) {
						setSuccess(data.success);
						router.push("/app");
					}
				})
				.catch(() => setError("Something went wrongly"));
		});
	};

	return {
		error,
		success,
		onSubmit,
		step,
		profile,
		setProfile,
		onClickBack,
		onClickNext,
		isNextDisabled,
		isPending,
		onSkip,
	};
};

export default useOnboarding;
