import React from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
	message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;
	return (
		<div className='bg-destructive/15 w-full rounded-md px-3 py-2.5 border border-destructive/30 flex items-center gap-x-2 text-sm text-destructive'>
			<ExclamationTriangleIcon className='size-4 min-w-4 min-h-4' />
			<p>{message}</p>
		</div>
	);
};

export default FormError;
