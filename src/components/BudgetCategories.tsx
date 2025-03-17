
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency } from "@/lib/utils";
import { Category } from "@/types";

const categoryIcons: Record<Category, string> = {
  food: "🍔",
  transport: "🚗",
  housing: "🏠",
  entertainment: "🎬",
  utilities: "💡",
  other: "📦",
};

const categoryLabels: Record<Category, string> = {
  food: "Food & Dining",
  transport: "Transportation",
  housing: "Housing & Rent",
  entertainment: "Entertainment",
  utilities: "Utilities",
  other: "Other",
};

export function BudgetCategories() {
  const { budgets } = useBudget();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Budget Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
            const isOverBudget = percentage > 100;

            return (
              <div key={budget.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{categoryIcons[budget.category]}</span>
                    <span className="font-medium">{categoryLabels[budget.category]}</span>
                  </div>
                  <span className={isOverBudget ? "text-red-600 font-medium" : ""}>
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </span>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={isOverBudget ? "bg-red-200" : ""}
                  indicatorClassName={isOverBudget ? "bg-red-600" : `bg-budget-${budget.category}`}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
