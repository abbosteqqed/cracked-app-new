export function getFileExtension(filename: string): string | null {
    if (!filename) return null;
    const match = filename.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1].toLowerCase() : null;
}


export function getStorageUrl(path: string): string {
    if (!path) {
        throw new Error("Path is required");
    }

    const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BASE_URL;
    if (!baseUrl) {
        throw new Error("R2 base URL environment variable is not configured");
    }

    const url = new URL(path, baseUrl);
    return url.toString();
}