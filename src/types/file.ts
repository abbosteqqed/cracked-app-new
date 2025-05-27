export interface FileUploadResult {
	url: string;
	pathname: string;
	contentType: string;
	name: string;
}

export interface ResponseInputImageGPT {
	detail: "low" | "high" | "auto";
	type: "input_image";
	file_id?: string | null;
	image_url?: string | null;
}