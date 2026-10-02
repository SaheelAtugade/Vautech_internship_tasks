import { useEffect, useState } from "react";

import { useExpenses } from "../../expense/hooks/useExpenses";
import { useBudget } from "../../budget/hooks/useBudget";

import MonthlySummary from "../components/MonthlySummary";
import CategoryReport from "../components/CategoryReport";
import MonthlyComparison from "../components/MonthlyComparison";
import BudgetVsActual from "../components/BudgetVsActual";
import HighestExpenses from "../components/HighestExpenses";
import ExpenseHistory from "../components/ExpenseHistory";

const Reports = () => {
  const { getExpenses } = useExpenses();
  const { getBudgetHistory } = useBudget();

  const today = new Date();

  const [month, setMonth] = useState(
    today.getMonth() + 1
  );

  const [year, setYear] = useState(
    today.getFullYear()
  );

  useEffect(() => {
    getExpenses().catch(() => {});
    getBudgetHistory().catch(() => {});
  }, []);

  const months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  const years = [
    today.getFullYear() - 1,
    today.getFullYear(),
    today.getFullYear() + 1,
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-6xl">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Reports
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Analyze your expenses and monthly budget.
          </p>
        </div>

        {/* Month & Year Selection */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 sm:max-w-xl">

            {/* Month */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Month
              </label>

              <select
                value={month}
                onChange={(event) =>
                  setMonth(Number(event.target.value))
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {months.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Year
              </label>

              <select
                value={year}
                onChange={(event) =>
                  setYear(Number(event.target.value))
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Monthly Summary */}
        <section className="mb-6">
          <MonthlySummary
            month={month}
            year={year}
          />
        </section>

        {/* Category + Budget */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">

          <CategoryReport
            month={month}
            year={year}
          />

          <BudgetVsActual
            month={month}
            year={year}
          />

        </div>

        {/* Highest Expenses */}
        <section className="mb-6">
          <HighestExpenses
            month={month}
            year={year}
            limit={5}
          />
        </section>

        {/* Monthly Comparison */}
        <section className="mb-6">
          <MonthlyComparison />
        </section>

        {/* Expense History */}
        <section className="mb-6">
          <ExpenseHistory />
        </section>

      </div>
    </div>
  );
};

export default Reports;