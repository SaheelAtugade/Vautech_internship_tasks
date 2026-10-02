import { useReports } from "../hooks/useReports";

const MonthlyComparison = () => {
  const {
    getMonthlyComparison,
    getMonthName,
  } = useReports();

  const comparison = getMonthlyComparison();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Monthly Expense Comparison
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Monthly Spending
        </h2>
      </div>

      {comparison.length === 0 ? (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No monthly data available.
        </p>
      ) : (
        <div className="space-y-5">
          {comparison.map((item) => {
            const maxValue = Math.max(item.budget, item.spent);

            const budgetWidth =
              maxValue > 0 ? (item.budget / maxValue) * 100 : 0;

            const spentWidth =
              maxValue > 0 ? (item.spent / maxValue) * 100 : 0;

            return (
              <div
                key={`${item.year}-${item.month}`}
                className="rounded-lg bg-slate-50 p-4"
              >
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {getMonthName(item.month)} {item.year}
                    </p>
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      item.exceeded > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.exceeded > 0
                      ? `Exceeded by Rs. ${item.exceeded.toLocaleString("en-IN")}`
                      : `Remaining Rs. ${item.remaining.toLocaleString("en-IN")}`}
                  </p>
                </div>

                {/* Budget */}
                <div className="mb-3">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-500">
                      Budget
                    </span>

                    <span className="font-medium text-slate-700">
                      Rs. {item.budget.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${budgetWidth}%` }}
                    />
                  </div>
                </div>

                {/* Spending */}
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-500">
                      Spent
                    </span>

                    <span className="font-medium text-slate-700">
                      Rs. {item.spent.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${
                        item.spent > item.budget
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${spentWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MonthlyComparison;