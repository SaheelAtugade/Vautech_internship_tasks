import { useState } from "react";
import { useReports } from "../hooks/useReports";

const ExpenseHistory = () => {
  const {
    getExpenseHistory,
  } = useReports();

  const currentDate = new Date();

  const [month, setMonth] = useState(
    String(currentDate.getMonth() + 1)
  );

  const [year, setYear] = useState(
    String(currentDate.getFullYear())
  );

  const [category, setCategory] = useState("All");

  const expenses = getExpenseHistory(
    month,
    year,
    category
  );

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

  const categories = [
    "All",
    "Food",
    "Travel",
    "Shopping",
    "Entertainment",
    "Bills",
    "Other",
  ];

  const years = [
    currentDate.getFullYear() - 1,
    currentDate.getFullYear(),
    currentDate.getFullYear() + 1,
  ];

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Expense History Report
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Expense History
        </h2>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {/* Month */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Month
          </label>

          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
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
            onChange={(event) => setYear(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Total */}
      <div className="mb-5 flex flex-col gap-1 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-600">
          Total Spending
        </p>

        <p className="text-lg font-bold text-slate-900">
          Rs. {total.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Expense List */}
      {expenses.length === 0 ? (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
          No expenses found for the selected filters.
        </p>
      ) : (
        <div className="divide-y divide-slate-200">
          {expenses.map((expense) => (
            <div
              key={expense._id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
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

                  {expense.note && (
                    <>
                      <span>•</span>
                      <span>{expense.note}</span>
                    </>
                  )}
                </div>
              </div>

              <p className="font-bold text-slate-900">
                Rs. {Number(expense.amount).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;