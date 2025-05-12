'use client';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from 'ai/react';
import { PaperclipIcon } from 'lucide-react';
import { PreviewAttachment } from './preview-attachment';
import useChatInput from '@/lib/hooks/use-chat-input';
import ChatSendButton from './chat-send-button';
import ChatStopButton from './chat-stop-button';
import { Attachment } from 'ai'

interface ChatMultiModalInputProps {
	isLoading?: boolean;
	chatId: string;
	handleSubmit: ReturnType<typeof useChat>['handleSubmit'];
	attachments: Array<Attachment>;
	setAttachments: React.Dispatch<React.SetStateAction<Array<Attachment>>>;
	stop: () => void;
	input: string;
	setInput: (value: string) => void;
}

const ChatMultiModalInput = (props: ChatMultiModalInputProps) => {
	const {
		fileInputRef,
		handleFileChange,
		uploadQueue,
		textareaRef,
		onChangeInput,
		submitForm,
	} = useChatInput({ ...props });
	const { isLoading, attachments, stop, input } = props;
	return (
		<form className="mx-auto max-w-3xl relative w-full pb-4 px-4">
			<div className="w-full relative bg-slate-3 border border-slate-7 focus-within:ring-2 focus-within:ring-slate-7 rounded-2xl">
				<input
					className="sr-only"
					type="file"
					ref={fileInputRef}
					multiple
					onChange={handleFileChange}
					tabIndex={-1}
					accept="image/png, image/jpeg, application/pdf"
				/>
				{(attachments.length > 0 || uploadQueue.length > 0) && (
					<div className="flex flex-row gap-2 overflow-x-scroll items-end">
						{attachments.map((attachment) => (
							<PreviewAttachment
								key={attachment.url}
								attachment={attachment}
							/>
						))}

						{uploadQueue.map((filename) => (
							<PreviewAttachment
								key={filename}
								attachment={{
									url: "",
									name: filename,
									contentType: "",
								}}
								isUploading={true}
							/>
						))}
					</div>
				)}
				<Textarea
					ref={textareaRef}
					value={input}
					onChange={onChangeInput}
					className="w-full bg-transparent flex-1 resize-none border-none min-h-10 max-h-[50vh] py-3 px-4 focus:ring-0"
					placeholder="Send a message..."
					autoFocus
					disabled={isLoading}
					onKeyDown={(event) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();

							if (isLoading) {
							} else {
								submitForm();
							}
						}
					}}
				/>
				<div className="flex justify-between items-center py-1 pb-3 px-3">
					<button
						disabled={isLoading || uploadQueue.length > 0}
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="size-8 flex justify-center items-center hover:bg-[rgba(255,255,255,0.1)] text-white transition-colors rounded-md">
						<PaperclipIcon className="size-4 " />
					</button>
					{isLoading ? (
						<ChatStopButton
							uploadQueue={uploadQueue}
							isLoading={isLoading}
							stop={stop}
						/>
					) : (
						<ChatSendButton
							input={input}
							uploadQueue={uploadQueue}
							submitForm={submitForm}
							isLoading={isLoading}
						/>
					)}
				</div>
			</div>
		</form>
	);
};

export default ChatMultiModalInput;
