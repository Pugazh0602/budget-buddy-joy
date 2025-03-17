
export type Transaction = {
  id: string;
  amount: number;
  description: string;
  category: Category;
  date: Date;
  isExpense: boolean;
};

export type Category = 'food' | 'transport' | 'housing' | 'entertainment' | 'utilities' | 'other';

export type Budget = {
  category: Category;
  limit: number;
  spent: number;
};

export type BudgetSummary = {
  income: number;
  expenses: number;
  balance: number;
  budgets: Budget[];
};
