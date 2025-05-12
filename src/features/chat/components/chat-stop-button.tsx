import React, { memo } from 'react';
import { IoStop } from 'react-icons/io5';

interface ChatStopButtonProps {
	isLoading?: boolean;
	stop: () => void;
	uploadQueue: string[];
}

const ChatStopButton = ({
	isLoading,
	uploadQueue,
	stop,
}: ChatStopButtonProps) => {
	return (
		<button
			disabled={!isLoading || uploadQueue.length > 0}
			onClick={() => {
				stop();
			}}
			type='button'
			className='size-8 flex disabled:opacity-30 disabled:pointer-events-none text-white justify-center items-center hover:bg-[rgba(255,255,255,0.1)] transition-colors relative'
		>
			<div className='absolute top-0 left-0 h-full w-full bg-transparent  rounded-full animate-spin border-t-2 border-t-white/80'></div>
			<IoStop className='size-4' />
		</button>
	);
};

export default memo(ChatStopButton);
