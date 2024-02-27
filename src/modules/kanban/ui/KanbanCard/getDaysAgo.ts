export function getDaysAgo(date: string): string {
    const today = new Date();
    const createdDate = new Date(date);
    const timeDifference = today.getTime() - createdDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysDifference === 0 ? "today" : `${daysDifference} days ago`;
}