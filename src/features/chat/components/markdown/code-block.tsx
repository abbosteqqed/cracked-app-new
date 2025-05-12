'use client';

import { codeToHast, type BundledLanguage } from 'shiki/bundle/web';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, JSX, useLayoutEffect, useState } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { CheckIcon, CopyIcon } from 'lucide-react';
import useCopyToClipboard from '@/lib/hooks/use-copy-to-clipboard';

interface CodeBlockProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	node: any;
	inline: boolean;
	className: string;
	children: React.ReactNode;
}

function CopyCodeButton({ code }: { code: string }) {
	const [, copyToClipboard, isCopied] = useCopyToClipboard();
	return (
		<button
			onClick={() => {
				copyToClipboard(code);
			}}
			type='button'
			className='flex items-center gap-2 hover:text-white/30 ml-auto transition-all duration-200 cursor-pointer'
		>
			{!isCopied ? (
				<>
					<CopyIcon className='size-4' />
					<span>Copy code</span>
				</>
			) : (
				<>
					<CheckIcon className='size-4' />
					<span>Copied!</span>
				</>
			)}
		</button>
	);
}

async function highlight(code: string, lang: BundledLanguage) {
	const out = await codeToHast(code, {
		lang,
		theme: 'github-dark-default',
	});

	return toJsxRuntime(out, {
		Fragment,
		jsx,
		jsxs,
	}) as JSX.Element;
}

function CodeBlockInner({
	code,
	lang,
}: {
	lang: BundledLanguage;
	code: string;
}) {
	const [nodes, setNodes] = useState<JSX.Element>();

	useLayoutEffect(() => {
		void highlight(code, lang).then(setNodes);
	}, [code, lang]);

	if (!nodes) return code;

	return (
		<div className='w-full bg-slate-3 backdrop-blur-3xl border border-slate-6 rounded-xl text-sm relative my-4'>
			<div className='w-full border-b border-b-slate-6 flex justify-between text-gray-200 items-center text-xs sticky px-4 py-4 rounded-t-md'>
				<span className='font-mono'>{lang}</span>
				<CopyCodeButton code={code} />
			</div>
			<div className='p-4 overflow-x-auto [&_.github-dark-default]:bg-transparent!'>
				{nodes}
			</div>
		</div>
	);
}

export function CodeBlock({ node }: CodeBlockProps) {
	const code = node.children?.[0].children?.[0].value;
	const language = node.children?.[0].properties.className?.[0];
	const lang = /language-(\w+)/.exec(language || '')?.[1];
	return (
		<CodeBlockInner
			code={code}
			lang={(lang ?? 'text') as BundledLanguage}
		/>
	);
}
