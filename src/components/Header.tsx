
import { Button } from "@/components/ui/button";
import { useBudget } from "@/contexts/BudgetContext";
import { Plus } from "lucide-react";

interface HeaderProps {
  onAddTransaction: () => void;
}

export function Header({ onAddTransaction }: HeaderProps) {
  const { summary } = useBudget();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-card rounded-lg shadow-sm mb-6">
      <div>
        <h1 className="text-2xl font-bold">Budget Buddy</h1>
        <p className="text-muted-foreground">Track your expenses, manage your budget</p>
      </div>
      <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-sm text-muted-foreground">Balance</span>
          <span className={`text-xl font-semibold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${summary.balance.toFixed(2)}
          </span>
        </div>
        <Button onClick={onAddTransaction} className="flex items-center gap-2">
          <Plus size={18} />
          <span>Add Transaction</span>
        </Button>
      </div>
    </div>
  );
}
