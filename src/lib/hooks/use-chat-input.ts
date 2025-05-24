import { Attachment } from 'ai';
import { useChat } from 'ai/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface UseChatInputProps {
	chatId: string;
	handleSubmit: ReturnType<typeof useChat>['handleSubmit'];
	setAttachments: React.Dispatch<React.SetStateAction<Array<Attachment>>>;
	attachments: Array<Attachment>;
	setInput: (value: string) => void;
	input: string;
}

const useChatInput = ({
	chatId,
	handleSubmit,
	setAttachments,
	attachments,
	setInput,
	input,
}: UseChatInputProps) => {
	const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [localStorageInput, setLocalStorageInput] = useLocalStorage(
		'input',
		''
	);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	const submitForm = useCallback(() => {
		

		handleSubmit(undefined, { experimental_attachments: attachments });

		setAttachments([]);

		setLocalStorageInput('');
	}, [attachments, handleSubmit, setAttachments, setLocalStorageInput, chatId]);

	const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
		adjustHeight();
	};

	useEffect(() => {
		if (textareaRef.current) {
			const domValue = textareaRef.current.value;
			// Prefer DOM value over localStorage to handle hydration
			const finalValue = domValue || localStorageInput || '';
			setInput(finalValue);
			adjustHeight();
		}
	}, [localStorageInput, setInput, textareaRef]);

	useEffect(() => {
		setLocalStorageInput(input);
	}, [input, setLocalStorageInput]);

	const uploadFile = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch('/api/files/upload', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();
				const { url, name, contentType } = data;

				return {
					url,
					name,
					contentType: contentType,
				};
			}
			const { error } = await response.json();
			console.error(error);
		} catch (error) {
			console.error('Failed to upload file, please try again!', error);
		}
	};

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(event.target.files || []);

			setUploadQueue(files.map(file => file.name));

			try {
				const uploadPromises = files.map(file => uploadFile(file));
				const uploadedAttachments = await Promise.all(uploadPromises);
				const successfullyUploadedAttachments = uploadedAttachments.filter(
					attachment => attachment !== undefined
				);

				console.log([...successfullyUploadedAttachments]);

				setAttachments(currentAttachments => [
					...currentAttachments,
					...successfullyUploadedAttachments,
				]);
			} catch (error) {
				console.error('Error uploading files!', error);
			} finally {
				setUploadQueue([]);
			}
		},
		[setAttachments]
	);

	return {
		fileInputRef,
		handleFileChange,
		uploadQueue,
		textareaRef,
		onChangeInput,
		submitForm,
	};
};

export default useChatInput;
