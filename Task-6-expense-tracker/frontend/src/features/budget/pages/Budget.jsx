import { useEffect, useMemo, useState } from "react";
import BudgetForm from "../components/BudgetForm";
import { useBudget } from "../hooks/useBudget";
import { useBudgetContext } from "../BudgetContext";
import { useExpenses } from "../../expense/hooks/useExpenses";

const Budget = () => {
  const [showForm, setShowForm] = useState(false);

  const {
    getBudget,
    getBudgetHistory,
    loading: budgetLoading,
    error: budgetError,
  } = useBudget();

  const { currentBudget, budgetHistory } = useBudgetContext();

  const {
    expenses,
    getExpenses,
    loading: expensesLoading,
    error: expensesError,
  } = useExpenses();

  useEffect(() => {
    getBudget().catch(() => {});
    getBudgetHistory().catch(() => {});
    getExpenses().catch(() => {});
  }, []);

  const loading = budgetLoading || expensesLoading;
  const error = budgetError || expensesError;

  const getMonthName = (month) => {
    return new Date(2000, month - 1).toLocaleString("en-IN", {
      month: "long",
    });
  };

  const calculateBudgetData = (budget) => {
    const monthlyExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() + 1 === budget.month &&
        expenseDate.getFullYear() === budget.year
      );
    });

    const spent = monthlyExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );

    const difference = budget.monthlyBudget - spent;

    return {
      spent,
      difference,
      status:
        difference < 0
          ? "Exceeded"
          : difference === 0
            ? "Budget Reached"
            : "Within Budget",
    };
  };

  const currentBudgetData = useMemo(() => {
    if (!currentBudget) return null;

    return calculateBudgetData(currentBudget);
  }, [currentBudget, expenses]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Monthly Budget
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your monthly spending limits.
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

        {!loading && !error && (
          <>
            {/* Budget Form */}
            {(!currentBudget || showForm) && (
              <div className="mb-6">
                <BudgetForm
                  currentBudget={currentBudget}
                  onSuccess={() => setShowForm(false)}
                />
              </div>
            )}

            {/* Current Budget */}
            {currentBudget && !showForm && currentBudgetData && (
              <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Current Budget
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      {getMonthName(currentBudget.month)} {currentBudget.year}
                    </h2>
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      currentBudgetData.status === "Exceeded"
                        ? "text-red-600"
                        : currentBudgetData.status === "Budget Reached"
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {currentBudgetData.status}
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {/* Budget */}
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Budget</p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      Rs. {currentBudget.monthlyBudget.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Spent */}
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Spent</p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      Rs. {currentBudgetData.spent.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Remaining / Exceeded */}
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      {currentBudgetData.difference < 0
                        ? "Exceeded"
                        : "Remaining"}
                    </p>

                    <p
                      className={`mt-1 text-xl font-bold ${
                        currentBudgetData.difference < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      Rs.{" "}
                      {Math.abs(currentBudgetData.difference).toLocaleString(
                        "en-IN",
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Budget History */}
            {!showForm && (
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 p-4 sm:p-5">
                  <h2 className="font-semibold text-slate-900">
                    Budget History
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    View your budgets and spending for previous months.
                  </p>
                </div>

                {budgetHistory.length === 0 ? (
                  <p className="p-5 text-sm text-slate-500">
                    No budget history available.
                  </p>
                ) : (
                  <div className="divide-y divide-slate-200">
                    {budgetHistory.map((budget) => {
                      const budgetData = calculateBudgetData(budget);

                      return (
                        <div
                          key={budget._id}
                          className="flex flex-col gap-4 p-4 sm:p-5"
                        >
                          {/* Month */}
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold text-slate-900">
                                {getMonthName(budget.month)} {budget.year}
                              </p>

                              <p className="text-sm text-slate-500">
                                Budget: Rs.{" "}
                                {budget.monthlyBudget.toLocaleString("en-IN")}
                              </p>
                            </div>

                            <p
                              className={`text-sm font-semibold ${
                                budgetData.status === "Exceeded"
                                  ? "text-red-600"
                                  : budgetData.status === "Budget Reached"
                                    ? "text-amber-600"
                                    : "text-green-600"
                              }`}
                            >
                              {budgetData.status}
                            </p>
                          </div>

                          {/* Details */}
                          <div className="grid gap-3 sm:grid-cols-3">
                            <div>
                              <p className="text-xs text-slate-500">Spent</p>

                              <p className="mt-1 text-sm font-semibold text-slate-900">
                                Rs. {budgetData.spent.toLocaleString("en-IN")}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-500">
                                {budgetData.difference < 0
                                  ? "Exceeded"
                                  : "Remaining"}
                              </p>

                              <p
                                className={`mt-1 text-sm font-semibold ${
                                  budgetData.difference < 0
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                Rs.{" "}
                                {Math.abs(budgetData.difference).toLocaleString(
                                  "en-IN",
                                )}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-500">Budget</p>

                              <p className="mt-1 text-sm font-semibold text-slate-900">
                                Rs.{" "}
                                {budget.monthlyBudget.toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Budget;
