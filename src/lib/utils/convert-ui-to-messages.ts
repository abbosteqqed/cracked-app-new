/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message as DBMessage } from '@prisma/client';
import {  Message, ToolInvocation } from 'ai';

export function convertToUIMessages(
	messages: Array<DBMessage>
): Array<Message> {
	return messages.reduce((chatMessages: Array<Message>, message) => {
		let textContent = '';
		let reasoning: string | undefined = undefined;
		const toolInvocations: Array<ToolInvocation> = [];

		if (Array.isArray(message.content)) {
			for (const content of message.content as Array<{
				type: string;
				text?: string;
				toolCallId?: string;
				toolName?: string;
				args?: any;
				reasoning?: string;
			}>) {
				if (content.type === 'text') {
					textContent += content.text;
				} else if (content.type === 'tool-call') {
					toolInvocations.push({
						state: 'call',
						toolCallId: content.toolCallId!,
						toolName: content.toolName!,
						args: content.args!,
					});
				} else if (content.type === 'reasoning') {
					reasoning = content.reasoning!;
				}
			}
		}

		chatMessages.push({
			id: message.id,
			role: message.role as Message['role'],
			content: textContent,
			reasoning,
			toolInvocations,
		});

		return chatMessages;
	}, []);
}

export function convertToUIMessage(message: DBMessage): Message {
	let textContent = '';
	let reasoning: string | undefined = undefined;
	const toolInvocations: Array<ToolInvocation> = [];

	if (Array.isArray(message.content)) {
		for (const content of message.content as Array<{
			type: string;
			text?: string;
			toolCallId?: string;
			toolName?: string;
			args?: any;
			reasoning?: string;
		}>) {
			if (content.type === 'text') {
				textContent += content.text;
			} else if (content.type === 'tool-call') {
				toolInvocations.push({
					state: 'call',
					toolCallId: content.toolCallId!,
					toolName: content.toolName!,
					args: content.args!,
				});
			} else if (content.type === 'reasoning') {
				reasoning = content.reasoning!;
			}
		}
	}

	return {
		id: message.id,
		role: message.role as Message['role'],
		content: textContent,
		reasoning,
		toolInvocations,
	};
}
