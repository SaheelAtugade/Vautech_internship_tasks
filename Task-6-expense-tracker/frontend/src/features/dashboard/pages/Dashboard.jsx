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

  const monthName = today.toLocaleString("en-IN", {
    month: "long",
  });

  // Only current-month expenses
  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === today.getMonth() &&
      expenseDate.getFullYear() === today.getFullYear()
    );
  });

  // Total spending for current month
  const totalSpending = currentMonthExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const budgetAmount = currentBudget?.monthlyBudget || 0;

  const difference = budgetAmount - totalSpending;

  const isExceeded = difference < 0;

  const remainingAmount = Math.abs(difference);

  const recentExpenses = expenses.slice(0, 5);

  const loading = expensesLoading || budgetLoading;
  const error = expensesError || budgetError;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Welcome, {user?.name}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here is your expense overview for {monthName}.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
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
                  {monthName} Budget
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

              {/* Remaining / Exceeded */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 sm:col-span-2 lg:col-span-1">
                <p className="text-sm font-medium text-slate-500">
                  {isExceeded ? "Budget Exceeded" : "Remaining Budget"}
                </p>

                <p
                  className={`mt-2 text-2xl font-bold sm:text-3xl ${
                    isExceeded ? "text-red-600" : "text-green-600"
                  }`}
                >
                  Rs. {remainingAmount.toLocaleString("en-IN")}
                </p>

                <p
                  className={`mt-1 text-xs ${
                    isExceeded ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {isExceeded
                    ? "Amount spent above budget"
                    : "Amount available to spend"}
                </p>
              </div>
            </div>

            {/* Current Budget Status */}
            {currentBudget && (
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {monthName} Budget Status
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      ₹{totalSpending.toLocaleString("en-IN")} spent out of ₹
                      {budgetAmount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-semibold ${
                      isExceeded
                        ? "text-red-600"
                        : difference === 0
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  >
                    {isExceeded
                      ? "Exceeded"
                      : difference === 0
                        ? "Budget Reached"
                        : "Within Budget"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      isExceeded
                        ? "bg-red-500"
                        : difference === 0
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        budgetAmount > 0
                          ? (totalSpending / budgetAmount) * 100
                          : 0,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>
                    Spent: {Math.round(
                      budgetAmount > 0
                        ? (totalSpending / budgetAmount) * 100
                        : 0
                    )}%
                  </span>

                  <span>
                    Budget: ₹{budgetAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}

            {/* No Budget */}
            {!currentBudget && (
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="font-semibold text-slate-900">
                  No Budget Set
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  You haven't set a budget for {monthName} yet.
                </p>
              </div>
            )}

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
                          {expense.category} -{" "}
                          {new Date(expense.date).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-slate-900 sm:text-base">
                        Rs. {Number(expense.amount).toLocaleString("en-IN")}
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