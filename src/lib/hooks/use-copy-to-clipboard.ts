import { useCallback, useEffect, useState } from "react";

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

export default function useCopyToClipboard(): [CopiedValue, CopyFn, boolean] {
	const [copiedText, setCopiedText] = useState<CopiedValue>(null);
	const [isCopied, setIsCopied] = useState(false);

	const copy: CopyFn = useCallback(async (text) => {
		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported");
			return false;
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			setIsCopied(true);
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			setIsCopied(false);
			return false;
		}
	}, []);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (isCopied) {
			timeout = setTimeout(() => {
				setIsCopied(false);
			}, 1000);
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [isCopied]);

	return [copiedText, copy, isCopied];
}
