/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import React, { memo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './code-block';
import CodeInline from './code-inline'

const components: Partial<Components> = {
	code: CodeInline,
	// @ts-expect-error
	pre: CodeBlock,
	strong: ({ node, children, ...props }) => {
		return (
			<span
				className='font-semibold'
				{...props}
			>
				{children}
			</span>
		);
	},
	ol: ({ node, children, ...props }) => {
		return (
			<ol
				className='list-decimal list-outside ml-4 py-2'
				{...props}
			>
				{children}
			</ol>
		);
	},
	li: ({ node, children, ...props }) => {
		return (
			<li
				className='py-2'
				{...props}
			>
				{children}
			</li>
		);
	},
	ul: ({ node, children, ...props }) => {
		return (
			<ul
				className='list-decimal list-outside pl-6 py-2'
				{...props}
			>
				{children}
			</ul>
		);
	},
	a: ({ node, children, href, ...props }) => {
		return (
			<Link
				className='text-blue-500 hover:underline'
				target='_blank'
				rel='noreferrer'
				{...props}
				href={href ?? ''}
			>
				{children}
			</Link>
		);
	},
	h1: ({ node, children, ...props }) => {
		return (
			<h1
				className='text-3xl font-semibold mt-6 mb-2'
				{...props}
			>
				{children}
			</h1>
		);
	},
	h2: ({ node, children, ...props }) => {
		return (
			<h2
				className='text-2xl font-semibold mt-6 mb-3'
				{...props}
			>
				{children}
			</h2>
		);
	},
	h3: ({ node, children, ...props }) => {
		return (
			<h3
				className='text-xl font-semibold mt-6 mb-2'
				{...props}
			>
				{children}
			</h3>
		);
	},
	h4: ({ node, children, ...props }) => {
		return (
			<h4
				className='text-lg font-semibold mt-6 mb-2'
				{...props}
			>
				{children}
			</h4>
		);
	},
	h5: ({ node, children, ...props }) => {
		return (
			<h5
				className='text-base font-semibold mt-6 mb-2'
				{...props}
			>
				{children}
			</h5>
		);
	},
	h6: ({ node, children, ...props }) => {
		return (
			<h6
				className='text-sm font-semibold mt-6 mb-2'
				{...props}
			>
				{children}
			</h6>
		);
	},
};
const remarkPlugins = [remarkGfm];
const NonMemoizedMarkdown = ({ children }: { children: string }) => {
	return (
		<ReactMarkdown
			remarkPlugins={remarkPlugins}
			components={components}
		>
			{children}
		</ReactMarkdown>
	);
};

export const Markdown = memo(
	NonMemoizedMarkdown,
	(prevProps, nextProps) => prevProps.children === nextProps.children
);
