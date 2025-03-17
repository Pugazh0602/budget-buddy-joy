
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), 'MMM d, yyyy');
}

// Function to generate background color for budget categories with different opacity levels
export function getBudgetCategoryColor(category: string, opacity: number = 1): string {
  const colors: Record<string, string> = {
    food: `rgba(155, 135, 245, ${opacity})`,
    transport: `rgba(126, 105, 171, ${opacity})`,
    housing: `rgba(110, 89, 165, ${opacity})`,
    entertainment: `rgba(139, 92, 246, ${opacity})`,
    utilities: `rgba(139, 92, 246, ${opacity})`,
    other: `rgba(214, 188, 250, ${opacity})`,
  };
  
  return colors[category] || `rgba(139, 92, 246, ${opacity})`;
}
