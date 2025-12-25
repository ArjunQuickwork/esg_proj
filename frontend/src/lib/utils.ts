import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {SeriesPoint} from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortSeriesByYear(series: SeriesPoint[]) {
  return [...series].sort(
      (a, b) => Number(a.year) - Number(b.year)
  );
}