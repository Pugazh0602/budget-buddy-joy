
import { useState } from "react";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { Header } from "@/components/Header";
import { BudgetSummary } from "@/components/BudgetSummary";
import { BudgetCategories } from "@/components/BudgetCategories";
import { RecentTransactions } from "@/components/RecentTransactions";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";

const Index = () => {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  return (
    <BudgetProvider>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="container mx-auto max-w-5xl">
          <Header onAddTransaction={() => setIsAddTransactionOpen(true)} />
          
          <BudgetSummary />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <BudgetCategories />
            </div>
            <div className="md:col-span-3">
              <RecentTransactions />
            </div>
          </div>
          
          <AddTransactionDialog 
            open={isAddTransactionOpen}
            onOpenChange={setIsAddTransactionOpen}
          />
        </div>
      </div>
    </BudgetProvider>
  );
};

export default Index;
