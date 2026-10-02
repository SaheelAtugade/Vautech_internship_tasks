import { useReports } from "../hooks/useReports";

const HighestExpenses = ({ month, year, limit = 5 }) => {
  const {
    getHighestExpenses,
    getMonthName,
  } = useReports();

  const expenses = getHighestExpenses(month, year, limit);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Highest Expenses Report
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          {getMonthName(month)} {year}
        </h2>
      </div>

      {expenses.length === 0 ? (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No expenses found for this month.
        </p>
      ) : (
        <div className="divide-y divide-slate-200">
          {expenses.map((expense, index) => (
            <div
              key={expense._id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                {/* Rank */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                  {index + 1}
                </div>

                <div>
                  <p className="font-medium text-slate-900">
                    {expense.title}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>{expense.category}</span>

                    <span>•</span>

                    <span>
                      {new Date(expense.date).toLocaleDateString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-base font-bold text-slate-900 sm:text-right">
                Rs. {Number(expense.amount).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HighestExpenses;