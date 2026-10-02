import { useReports } from "../hooks/useReports";

const BudgetVsActual = ({ month, year }) => {
  const {
    getBudgetVsActual,
    getMonthName,
  } = useReports();

  const report = getBudgetVsActual(month, year);

  const progressWidth = Math.min(report.percentageUsed, 100);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Budget vs Actual Spending
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          {getMonthName(month)} {year}
        </h2>
      </div>

      {report.status === "No Budget" ? (
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            No budget has been set for this month.
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            Actual Spending: Rs.{" "}
            {report.actualSpending.toLocaleString("en-IN")}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Budget
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                Rs. {report.budget.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Actual Spending
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                Rs. {report.actualSpending.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                {report.exceeded > 0 ? "Exceeded" : "Remaining"}
              </p>

              <p
                className={`mt-1 text-xl font-bold ${
                  report.exceeded > 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                Rs.{" "}
                {(report.exceeded > 0
                  ? report.exceeded
                  : report.remaining
                ).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">
                Budget Used
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {report.percentageUsed}%
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${
                  report.status === "Exceeded"
                    ? "bg-red-500"
                    : report.status === "Budget Reached"
                      ? "bg-amber-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="mt-5">
            <p
              className={`text-sm font-semibold ${
                report.status === "Exceeded"
                  ? "text-red-600"
                  : report.status === "Budget Reached"
                    ? "text-amber-600"
                    : "text-green-600"
              }`}
            >
              {report.status}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BudgetVsActual;