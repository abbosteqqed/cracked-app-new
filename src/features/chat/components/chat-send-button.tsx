import { SendIcon } from 'lucide-react';
import React, { memo } from 'react';

interface ChatSendButtonProps {
	submitForm: () => void;
	isLoading?: boolean;
	input: string;
	uploadQueue: string[];
}

const ChatSendButton = ({
	isLoading,
	submitForm,
	input,
	uploadQueue,
}: ChatSendButtonProps) => {
	return (
		<button
			disabled={isLoading || uploadQueue.length > 0 || input.length === 0}
			onClick={() => {
				submitForm();
			}}
			type='button'
			className='size-8 flex disabled:opacity-30 disabled:pointer-events-none justify-center items-center hover:bg-[rgba(255,255,255,0.1)] transition-colors text-white rounded-full'
		>
			<SendIcon className='size-4' />
		</button>
	);
};

export default memo(ChatSendButton);
