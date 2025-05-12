import useCopyToClipboard from '@/lib/hooks/use-copy-to-clipboard';
import { CheckIcon, CopyIcon } from 'lucide-react';

const CopyToClipboardButton = ({ content }: { content: string }) => {
	const [, copyToClipboard, copied] = useCopyToClipboard();
	return (
		<button
			onClick={async () => {
				await copyToClipboard(content);
			}}
			type='button'
			className='size-7 flex justify-center items-center rounded-md hover:bg-white/10 transition-colors cursor-pointer'
		>
			{!copied ? (
				<CopyIcon className='size-4' />
			) : (
				<CheckIcon className='size-4' />
			)}
		</button>
	);
};

export default CopyToClipboardButton;
