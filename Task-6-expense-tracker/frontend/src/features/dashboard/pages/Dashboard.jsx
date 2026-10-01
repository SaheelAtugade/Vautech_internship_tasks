import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useBudgetContext } from "../../budget/BudgetContext";
import { useBudget } from "../../budget/hooks/useBudget";
import { useExpenses } from "../../expense/hooks/useExpenses";

const Dashboard = () => {
  const { user } = useOutletContext();
  const { currentBudget } = useBudgetContext();
  const { getBudget, loading: budgetLoading, error: budgetError } = useBudget();
  const {
    expenses,
    getExpenses,
    loading: expensesLoading,
    error: expensesError,
  } = useExpenses();

  useEffect(() => {
    // The dashboard needs the latest expenses and current budget.
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
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome, {user.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here is your expense overview.
          </p>
        </div>

        {loading && <p className="text-slate-500">Loading dashboard...</p>}

        {!loading && error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-medium text-slate-500">Monthly Budget</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  Rs. {budgetAmount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-medium text-slate-500">This Month Spent</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  Rs. {totalSpending.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-medium text-slate-500">Remaining Budget</p>
                <p
                  className={`mt-2 text-2xl font-bold ${
                    remainingBudget < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  Rs. {remainingBudget.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900">Recent Expenses</h2>
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
                      className="flex items-center justify-between gap-4 p-5"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{expense.title}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {expense.category} - {new Date(expense.date).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                      <p className="font-semibold text-slate-900">
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
