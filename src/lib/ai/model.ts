import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { customProvider } from "ai";

export const DEFAULT_CHAT_MODEL: string = "chat-model-small";

export const myProvider = customProvider({
	languageModels: {
		pro: google("gemini-2.0-flash"),
		"title-model": google("gemini-1.5-pro"),
		chatgptMini: openai("gpt-4.1-mini"),
	},
});
