export function formatDate(date: Date): string {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${day}.${month}.${year} ${hours}:${minutes}`;
}
