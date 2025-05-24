import { Attachment, Message } from "@prisma/client";

export interface DbMessageWithAttachements extends Message {
	experimental_attachments: Attachment[];
}
