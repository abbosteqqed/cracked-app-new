import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';


import React from 'react';
import { ProfileDTO } from '../hooks/use-onboarding';
import { languageOptions } from '@/lib/constants/onboarding';

interface OnBoardingLanguageStepProps {
	value: string;
	setProfile: React.Dispatch<React.SetStateAction<ProfileDTO>>;
}

const OnBoardingLanguageStep = ({
	value,
	setProfile,
}: OnBoardingLanguageStepProps) => {
	return (
		<div className='grid w-full'>
			<Select
				onValueChange={val => setProfile(prev => ({ ...prev, language: val }))}
				value={value}
			>
				<SelectTrigger className='px-4 py-3'>
					<SelectValue placeholder='Select' />
				</SelectTrigger>
				<SelectContent>
					{languageOptions.map(item => (
						<SelectItem
							key={item}
							value={item}
						>
							{item}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default OnBoardingLanguageStep;
