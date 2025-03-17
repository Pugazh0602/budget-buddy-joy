
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Transaction, Budget, BudgetSummary, Category } from "@/types";

interface BudgetContextType {
  transactions: Transaction[];
  budgets: Budget[];
  summary: BudgetSummary;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  updateBudget: (category: Category, limit: number) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

const DEFAULT_BUDGETS: Budget[] = [
  { category: "food", limit: 400, spent: 0 },
  { category: "transport", limit: 200, spent: 0 },
  { category: "housing", limit: 1000, spent: 0 },
  { category: "entertainment", limit: 200, spent: 0 },
  { category: "utilities", limit: 300, spent: 0 },
  { category: "other", limit: 200, spent: 0 },
];

// Sample transactions
const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    amount: 1500,
    description: "Salary",
    category: "other",
    date: new Date("2023-05-01"),
    isExpense: false,
  },
  {
    id: "2",
    amount: 85,
    description: "Grocery shopping",
    category: "food",
    date: new Date("2023-05-03"),
    isExpense: true,
  },
  {
    id: "3",
    amount: 45,
    description: "Gas",
    category: "transport",
    date: new Date("2023-05-05"),
    isExpense: true,
  },
  {
    id: "4",
    amount: 20,
    description: "Movie tickets",
    category: "entertainment",
    date: new Date("2023-05-08"),
    isExpense: true,
  },
  {
    id: "5",
    amount: 950,
    description: "Rent",
    category: "housing",
    date: new Date("2023-05-01"),
    isExpense: true,
  },
];

const calculateSummary = (transactions: Transaction[], budgets: Budget[]): BudgetSummary => {
  const income = transactions
    .filter((t) => !t.isExpense)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.isExpense)
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate spent amount for each budget category
  const updatedBudgets = [...budgets];
  
  // Reset spent amounts
  updatedBudgets.forEach(budget => {
    budget.spent = 0;
  });
  
  // Calculate new spent amounts
  transactions
    .filter((t) => t.isExpense)
    .forEach((transaction) => {
      const budgetIndex = updatedBudgets.findIndex(
        (b) => b.category === transaction.category
      );
      if (budgetIndex >= 0) {
        updatedBudgets[budgetIndex].spent += transaction.amount;
      }
    });

  return {
    income,
    expenses,
    balance: income - expenses,
    budgets: updatedBudgets,
  };
};

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
  const [budgets, setBudgets] = useState<Budget[]>(DEFAULT_BUDGETS);
  const [summary, setSummary] = useState<BudgetSummary>({
    income: 0,
    expenses: 0,
    balance: 0,
    budgets: [],
  });

  useEffect(() => {
    const newSummary = calculateSummary(transactions, budgets);
    setSummary(newSummary);
    setBudgets(newSummary.budgets);
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const updateBudget = (category: Category, limit: number) => {
    const updatedBudgets = budgets.map((budget) =>
      budget.category === category ? { ...budget, limit } : budget
    );
    setBudgets(updatedBudgets);
    setSummary(calculateSummary(transactions, updatedBudgets));
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        budgets,
        summary,
        addTransaction,
        deleteTransaction,
        updateBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
