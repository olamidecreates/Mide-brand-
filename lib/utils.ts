import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shared hover-nudge treatment for the ArrowUpRight icon inside a `group`
 * CTA button — used identically across navbar, hero, featured-collection,
 * brand-story, and lookbook so the "arrow nudges up-right on hover" motif
 * stays in one place instead of five copies.
 */
export const arrowNudgeClass =
  "transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";
