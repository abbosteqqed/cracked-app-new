import { ChatRequestOptions, Message } from 'ai';

import { memo } from 'react';
import { MessageItem } from './message-item';
import { useScrollToBottom } from '@/lib/hooks/use-scroll-to-bottom';
import equal from 'fast-deep-equal';
import GradientCircle from '@/components/ui/gradient-circle';

function PureMessages({
	messages,
	isLoading,
}: {
	messages: Array<Message>;
	isLoading: boolean;
	reload: (
		chatRequestOptions?: ChatRequestOptions
	) => Promise<string | null | undefined>;
}) {
	const [messagesContainerRef, messagesEndRef] =
		useScrollToBottom<HTMLDivElement>();
	return (
		<div
			ref={messagesContainerRef}
			className='relative overflow-y-auto flex-1 gap-8 flex flex-col min-w-0 py-4'
		>
			{messages.map(message => {
				return (
					<MessageItem
						key={message.id}
						message={message}
					/>
				);
			})}

			{isLoading &&
				messages.length > 0 &&
				messages[messages.length - 1].role === 'user' && (
					<div
						data-role={'assistant'}
						className='max-w-3xl px-4 w-full mx-auto gap-4 group/message'
					>
						<div className='flex w-full animate-pulse gap-4 items-center group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:w-fit'>
							<GradientCircle />

							<div className='text-white/80'>Thinking...</div>
						</div>
					</div>
				)}
			<div
				ref={messagesEndRef}
				className='shrink-0 min-w-[24px] min-h-[24px]'
			/>
		</div>
	);
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
	if (prevProps.isLoading !== nextProps.isLoading) return false;
	if (prevProps.isLoading && nextProps.isLoading) return false;
	if (prevProps.messages.length !== nextProps.messages.length) return false;
	if (!equal(prevProps.messages, nextProps.messages)) return false;

	return true;
});
