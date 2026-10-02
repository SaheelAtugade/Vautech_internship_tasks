import { useReports } from "../hooks/useReports";

const MonthlySummary = ({ month, year }) => {
  const { getMonthlySummary, getMonthName } = useReports();

  const summary = getMonthlySummary(month, year);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-slate-500">Monthly Expense Summary</p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          {getMonthName(month)} {year}
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Budget */}
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Budget
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            Rs. {summary.budget.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Spent */}
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Total Spent
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            Rs. {summary.spent.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Remaining */}
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Remaining
          </p>

          <p className="mt-1 text-xl font-bold text-green-600">
            Rs. {summary.remaining.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Exceeded */}
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Exceeded
          </p>

          <p className="mt-1 text-xl font-bold text-red-600">
            Rs. {summary.exceeded.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Number of expenses */}
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Total Expenses
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {summary.totalExpenses}
          </p>
        </div>

        {/* Status */}
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p
            className={`mt-1 text-lg font-bold ${
              summary.status === "Exceeded"
                ? "text-red-600"
                : summary.status === "Budget Reached"
                  ? "text-amber-600"
                  : summary.status === "Within Budget"
                    ? "text-green-600"
                    : "text-slate-600"
            }`}
          >
            {summary.status}
          </p>
        </div>

      </div>
    </div>
  );
};

export default MonthlySummary;