import { Message } from 'ai';

export function getMostRecentUserMessage(messages: Array<Message>) {
	const userMessages = messages.filter(message => message.role === 'user');
	return userMessages.at(-1);
}

export function userCoreMessage(message: Message) {
	return [
		{
			text: message.content,
			type: 'text',
		},
	];
}
