import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const slugTransform = (str: string) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
};

export const timeInterval = (oldTimeString: Date | string) => {
    oldTimeString = oldTimeString.toString();

    const oldTime = new Date(oldTimeString);
    const now = new Date();

    const seconds = (now.getTime() - oldTime.getTime()) / 1000;
    if (seconds < 60) return `${seconds} seconds`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months`;

    const years = Math.floor(months / 12);
    return `${years} years`;
};
