import { Attachment } from 'ai';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';

const PreviewAttachments = ({ attachments }: { attachments: Attachment[] }) => {
	return (
		<div className='mb-2 flex gap-2 justify-end w-full'>
			{attachments.slice(0, 2).map((attachment, index) => (
				<div
					key={index}
					className='relative w-24 h-24 border rounded-lg overflow-hidden'
				>
					{attachment.contentType?.startsWith('image') ? (
						<Image
							src={attachment.url}
							alt={attachment.name || 'Attachment'}
							width={96}
							height={96}
							className='w-full h-full object-cover'
						/>
					) : attachment.contentType === 'application/pdf' ? (
						<a
							href={attachment.url}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center w-full h-full bg-gray-800 text-white'
						>
							PDF
						</a>
					) : (
						<Link
							href={attachment.url}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center w-full h-full bg-gray-700 text-white text-xs text-center p-2'
						>
							{attachment.name || 'Download'}
						</Link>
					)}
				</div>
			))}

			{attachments.length > 2 && (
				<div className='flex items-center justify-center w-24 h-24 border rounded-lg bg-gray-700 text-white'>
					+{attachments.length - 2} more
				</div>
			)}
		</div>
	);
};

export default memo(PreviewAttachments);
