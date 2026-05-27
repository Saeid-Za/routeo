import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function useClass(...inputs: MaybeRefOrGetter<ClassValue>[]) {
	return computed(() => cn(inputs.map(toValue)))
}

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
