import { useEffect, useState } from "react";
import BudgetForm from "../components/BudgetForm";
import { useBudget } from "../hooks/useBudget";
import { useBudgetContext } from "../BudgetContext";

const Budget = () => {
  const [showForm, setShowForm] = useState(false);

  const { getBudget, loading, error } = useBudget();
  const { currentBudget } = useBudgetContext();

  const monthName = new Date().toLocaleString("en-IN", {
    month: "long",
  });

  useEffect(() => {
    getBudget().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Monthly Budget
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Set a spending limit for {monthName}.
            </p>
          </div>

          {currentBudget && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
            >
              Update Budget
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <p className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
            Loading budget...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Current Budget */}
        {!loading && !error && currentBudget && !showForm && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-sm font-medium text-slate-500">
              Current budget
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Rs.{" "}
              {currentBudget.monthlyBudget.toLocaleString("en-IN")}
            </p>
          </div>
        )}

        {/* Budget Form */}
        {!loading && !error && (!currentBudget || showForm) && (
          <BudgetForm
            currentBudget={currentBudget}
            onSuccess={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Budget;