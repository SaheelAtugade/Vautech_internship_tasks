import { useReports } from "../hooks/useReports";

const CategoryReport = ({ month, year }) => {
  const { getCategoryReport, getMonthName } = useReports();

  const categories = getCategoryReport(month, year);

  const totalSpent = categories.reduce(
    (total, item) => total + item.total,
    0
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Category-wise Expense Report
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          {getMonthName(month)} {year}
        </h2>
      </div>

      {totalSpent === 0 ? (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No expenses found for this month.
        </p>
      ) : (
        <div className="space-y-4">
          {categories
            .filter((item) => item.total > 0)
            .sort((a, b) => b.total - a.total)
            .map((item) => {
              const percentage = (item.total / totalSpent) * 100;

              return (
                <div key={item.category}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {item.category}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.count} expense
                        {item.count !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">
                        Rs. {item.total.toLocaleString("en-IN")}
                      </p>

                      <p className="text-xs text-slate-500">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}

      <div className="mt-6 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            Total Spending
          </p>

          <p className="font-bold text-slate-900">
            Rs. {totalSpent.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryReport;