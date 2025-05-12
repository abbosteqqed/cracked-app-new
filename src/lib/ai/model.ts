import { google } from "@ai-sdk/google";
import { customProvider } from "ai";

export const DEFAULT_CHAT_MODEL: string = "chat-model-small";

export const myProvider = customProvider({
	languageModels: {
		pro: google("gemini-2.0-pro-exp-02-05"),
		"title-model": google("gemini-1.5-flash"),
	},
});
