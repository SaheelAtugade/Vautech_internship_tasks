import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { useBudgetContext } from "../../budget/BudgetContext";
import { useBudget } from "../../budget/hooks/useBudget";
import { useExpenses } from "../../expense/hooks/useExpenses";

const Dashboard = () => {
  const { user } = useOutletContext();

  const { currentBudget } = useBudgetContext();

  const {
    getBudget,
    loading: budgetLoading,
    error: budgetError,
  } = useBudget();

  const {
    expenses,
    getExpenses,
    loading: expensesLoading,
    error: expensesError,
  } = useExpenses();

  useEffect(() => {
    getExpenses().catch(() => {});
    getBudget().catch(() => {});
  }, []);

  const today = new Date();

  // Only current-month expenses are used for the monthly budget calculation.
  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === today.getMonth() &&
      expenseDate.getFullYear() === today.getFullYear()
    );
  });

  const totalSpending = currentMonthExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const budgetAmount = currentBudget?.monthlyBudget || 0;

  const remainingBudget = budgetAmount - totalSpending;

  const recentExpenses = expenses.slice(0, 5);

  const loading = expensesLoading || budgetLoading;
  const error = expensesError || budgetError;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Welcome, {user.name}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here is your expense overview.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-slate-500">
            Loading dashboard...
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
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Monthly Budget */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-medium text-slate-500">
                  Monthly Budget
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Rs. {budgetAmount.toLocaleString("en-IN")}
                </p>
              </div>

              {/* This Month Spent */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-medium text-slate-500">
                  This Month Spent
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Rs. {totalSpending.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Remaining Budget */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 sm:col-span-2 lg:col-span-1">
                <p className="text-sm font-medium text-slate-500">
                  Remaining Budget
                </p>

                <p
                  className={`mt-2 text-2xl font-bold sm:text-3xl ${
                    remainingBudget < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  Rs. {remainingBudget.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Recent Expenses */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white">

              <div className="border-b border-slate-200 p-4 sm:p-5">
                <h2 className="font-semibold text-slate-900">
                  Recent Expenses
                </h2>
              </div>

              {recentExpenses.length === 0 ? (
                <p className="p-5 text-sm text-slate-500">
                  No expenses added yet.
                </p>
              ) : (
                <div className="divide-y divide-slate-200">
                  {recentExpenses.map((expense) => (
                    <div
                      key={expense._id}
                      className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {expense.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {expense.category}{" "}
                          -{" "}
                          {new Date(expense.date).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-slate-900 sm:text-base">
                        Rs. {expense.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;