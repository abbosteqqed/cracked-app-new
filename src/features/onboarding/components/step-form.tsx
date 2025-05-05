'use client';
import React from 'react';
import OnBoardingWrapper from './onboarding-wrapper';
import { Input } from '@/components/ui/input';
import OnboardingGenderStep from './onboarding-gender-step';
import OnBoardingLanguageStep from './on-boarding-language-step';
import OnboardingAgentsStep from './onboarding-agents-step';
import OnboardingPending from './onboarding-pending';
import useOnboarding from '../hooks/use-onboarding';
import FormSuccess from '@/components/fields/form-success';
import FormError from '@/components/fields/form-error';

const StepForm = () => {
	const {
		step,
		profile,
		setProfile,
		onClickNext,
		onClickBack,
		isNextDisabled,
		onSkip,
		isPending,
		success,
		error,
	} = useOnboarding();

	return (
		<>
			{isPending ? (
				<OnboardingPending />
			) : (
				<OnBoardingWrapper
					step={step}
					isPending={false}
					onClickNext={onClickNext}
					onClickPrev={onClickBack}
					isNextDisabled={isNextDisabled}
				>
					{step === 2 && (
						<Input
							value={profile.age}
							onChange={e => {
								setProfile(prev => ({ ...prev, age: e.target.value }));
							}}
							className='py-3 px-4'
							placeholder='30'
						/>
					)}
					{step === 3 && (
						<OnboardingGenderStep
							value={profile.gender}
							setProfile={setProfile}
						/>
					)}
					{step === 4 && (
						<OnBoardingLanguageStep
							value={profile.language}
							setProfile={setProfile}
						/>
					)}
					{step === 5 && (
						<OnboardingAgentsStep
							value={profile.usedFor}
							setProfile={setProfile}
						/>
					)}
					<FormSuccess message={success} />
					<FormError message={error} />
				</OnBoardingWrapper>
			)}
			<button
				onClick={onSkip}
				disabled={isPending}
				type='button'
				className='top-7 left-7 p-0 bg-transparent absolute z-20 text-white/50 hover:text-white/80 transition-colors text-sm'
			>
				Skip
			</button>
		</>
	);
};

export default StepForm;
