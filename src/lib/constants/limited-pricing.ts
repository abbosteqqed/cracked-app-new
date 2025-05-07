interface LimitedPricing {
	main: {
		planName: string;
		planSlogan: string;
		pricing: string;
		pricingDescription: string;
	};
	benefits: string[];
	plan: string;
	buttonText: string;
	buttonVariant: 'gradient' | 'simple';
}

export const LIMITED_PRICING: LimitedPricing[] = [
	{
		main: {
			planName: 'Free plan',
			planSlogan: 'Start exploring with our free plan. No commitment required.',
			pricing: '$0/Month',
			pricingDescription:
				'Enjoy a free trial of the Base Plan for your first month.',
		},
		benefits: ['Access Only One Agent', '200 Usage Credits Included'],
		plan: 'free',
		buttonText: 'Continue With Free',
		buttonVariant: 'simple',
	},
	{
		main: {
			planName: 'Base Plan - Limited Time Offer',
			planSlogan: 'Exclusive introductory pricing for a limited period.',
			pricing: '$19/Month',
			pricingDescription:
				'Begin your Base Plan with a special first-month rate of $19.',
		},
		benefits: [
			'Full Access to All AI Agents',
			'2,000,000 Usage Credits Included',
		],
		plan: 'base',
		buttonText: 'Continue With Limited Offer',
		buttonVariant: 'gradient',
	},
];
