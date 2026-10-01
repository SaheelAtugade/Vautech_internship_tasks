import { useEffect, useState } from "react";
import BudgetForm from "../components/BudgetForm";
import { useBudget } from "../hooks/useBudget";
import { useBudgetContext } from "../BudgetContext";

const Budget = () => {
  const [showForm, setShowForm] = useState(false);
  const { getBudget, loading, error } = useBudget();
  const { currentBudget } = useBudgetContext();
  const monthName = new Date().toLocaleString("en-IN", { month: "long" });

  useEffect(() => {
    // Load the logged-in user's current budget when this page opens.
    getBudget().catch(() => {});
  }, []);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Monthly Budget</h1>
            <p className="mt-1 text-sm text-slate-500">
              Set a spending limit for {monthName}.
            </p>
          </div>

          {currentBudget && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Update Budget
            </button>
          )}
        </div>

        {loading && (
          <p className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500">
            Loading budget...
          </p>
        )}

        {!loading && error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && currentBudget && !showForm && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-medium text-slate-500">Current budget</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              Rs. {currentBudget.monthlyBudget.toLocaleString("en-IN")}
            </p>
          </div>
        )}

        {!loading && !error && (!currentBudget || showForm) && (
          <BudgetForm
            currentBudget={currentBudget}
            onSuccess={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Budget
