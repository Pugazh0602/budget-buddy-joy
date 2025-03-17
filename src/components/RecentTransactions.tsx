
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudget } from "@/contexts/BudgetContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Category } from "@/types";
import { ArrowDownIcon, ArrowUpIcon, Trash2 } from "lucide-react";

const categoryIcons: Record<Category, string> = {
  food: "🍔",
  transport: "🚗",
  housing: "🏠",
  entertainment: "🎬",
  utilities: "💡",
  other: "📦",
};

export function RecentTransactions() {
  const { transactions, deleteTransaction } = useBudget();
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No transactions yet. Add one to get started!
            </div>
          ) : (
            sortedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg">
                      {categoryIcons[transaction.category]}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`font-medium ${transaction.isExpense ? "text-red-600" : "text-green-600"}`}>
                    {transaction.isExpense ? (
                      <span className="flex items-center">
                        <ArrowDownIcon className="mr-1 h-4 w-4" />
                        {formatCurrency(transaction.amount)}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        {formatCurrency(transaction.amount)}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
