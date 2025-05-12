'use client';
import { memo } from 'react';

import { Message } from 'ai';
import { Markdown } from './markdown';
import { AnimatePresence, motion } from 'framer-motion';
import PreviewAttachments from './preview-attachements';
import equal from 'fast-deep-equal';
import CopyToClipboardButton from '@/components/shared/copy-to-clipboard';
import GradientCircle from '@/components/ui/gradient-circle';
import { cn } from '@/lib/utils';

const PurePreviewMessage = ({
	message,
}: {
	message: Message;
	isLoading?: boolean;
}) => {
	const isAssistant = message.role === 'assistant';
	const isAssistantTool = !!(isAssistant && message.toolInvocations?.length);
	const attachments = message.experimental_attachments || [];
	return (
		<AnimatePresence>
			<motion.div
				initial={{ y: 5, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				data-role={message.role}
				className='max-w-3xl px-4 w-full mx-auto gap-4 group/message'
			>
				{attachments.length > 0 && (
					<div className='ml-auto flex w-full max-w-2xl'>
						<PreviewAttachments attachments={attachments} />
					</div>
				)}
				<div className='flex w-full gap-4 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:w-fit'>
					{isAssistant && <GradientCircle className='h-8 w-8 min-w-8' />}
					<div
						className={cn(
							'flex w-full flex-col min-w-0 py-2 gap-2',
							message.role === 'user' &&
								'px-5 py-2.5 rounded-3xl rounded-br-none bg-white/5'
						)}
					>
						{message.content && (
							<Markdown>{message.content}</Markdown>
						)}

						{isAssistant && !isAssistantTool && (
							<div className='w-full py-2 flex items-center invisible group-hover/message:visible'>
								<CopyToClipboardButton content={message.content} />
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export const MessageItem = memo(PurePreviewMessage, (prevProps, nextProps) => {
	if (prevProps.isLoading !== nextProps.isLoading) return false;
	if (prevProps.message.reasoning !== nextProps.message.reasoning) return false;
	if (prevProps.message.content !== nextProps.message.content) return false;
	if (
		!equal(prevProps.message.toolInvocations, nextProps.message.toolInvocations)
	)
		return false;

	return true;
});
