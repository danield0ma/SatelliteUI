import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(date);
}

export function getStatusColor(
	value: number,
	min: number,
	max: number
): string {
	if (value < min + (max - min) * 0.2 || value > max - (max - min) * 0.2) {
		return "danger";
	} else if (
		value < min + (max - min) * 0.4 ||
		value > max - (max - min) * 0.4
	) {
		return "warning";
	} else {
		return "success";
	}
}

export function randomFloat(min: number, max: number, decimals = 2): number {
	const val = Math.random() * (max - min) + min;
	const factor = Math.pow(10, decimals);
	return Math.round(val * factor) / factor;
}
