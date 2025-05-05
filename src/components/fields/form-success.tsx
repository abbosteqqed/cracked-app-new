import React from 'react';
import { CheckCircledIcon } from '@radix-ui/react-icons';

interface FormSuccessProps {
	message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) return null;
	return (
		<div className='bg-emerald-500/15 border w-full border-emerald-500/30 rounded-md px-3 py-2.5 flex items-center gap-x-2 text-sm text-emerald-500'>
			<CheckCircledIcon className='size-4 min-w-4 min-h-4' />
			<p>{message}</p>
		</div>
	);
};

export default FormSuccess;
