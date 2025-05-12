'use client';
import { Attachment } from 'ai';
import { FileText, Loader } from 'lucide-react';
import Image from 'next/image';


export const PreviewAttachment = ({
	attachment,
	isUploading = false,
}: {
	attachment: Attachment;
	isUploading?: boolean;
}) => {
	const { name, url, contentType } = attachment;
	

	const renderPreview = () => {
		if (!contentType) {
			return <div />;
		}

		if (contentType.startsWith('image')) {
			return (
				<Image
					key={url}
					src={url}
					height={64}
					width={64}
					alt={name ?? 'An image attachment'}
					className='rounded-md h-16 w-16 object-cover'
				/>
			);
		} else if (contentType.startsWith('application/pdf')) {
			return (
				<div className='flex items-center justify-center'>
					<FileText className='h-8 w-8 text-zinc-500' />
				</div>
			);
		} else {
			return <div />;
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<div className='w-20 h-16 aspect-video bg-muted rounded-md relative flex flex-col items-center justify-center'>
				{renderPreview()}

				{isUploading && (
					<div className='animate-spin absolute text-zinc-500'>
						<Loader className='h-6 w-6' />
					</div>
				)}
			</div>
			<div className='flex flex-col'>
				<div className='text-xs text-zinc-500 max-w-16 truncate'>{name}</div>
				{/* {!isPending && tokens > 0 && (
					<div className='text-xs text-zinc-500 font-medium'>
						{tokens} tokens
					</div>
				)} */}
			</div>
		</div>
	);
};
