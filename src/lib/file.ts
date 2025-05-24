
export function getFileExtension(filename: string): string | null {
    if (!filename) return null;
    const match = filename.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1].toLowerCase() : null;
}


