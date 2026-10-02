import { useEffect, useState } from "react";
import { useBudget } from "../hooks/useBudget";

const BudgetForm = ({ currentBudget, onSuccess }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");

  const { error, loading, setBudget } = useBudget();

  const currentYear = new Date().getFullYear();

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

  useEffect(() => {
    if (currentBudget) {
      setMonth(currentBudget.month);
      setYear(currentBudget.year);
      setMonthlyBudget(currentBudget.monthlyBudget);
    } else {
      const today = new Date();

      setMonth(today.getMonth() + 1);
      setYear(today.getFullYear());
      setMonthlyBudget("");
    }
  }, [currentBudget]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const budgetData = {
      month: Number(month),
      year: Number(year),
      monthlyBudget: Number(monthlyBudget),
    };

    try {
      await setBudget(budgetData);

      onSuccess?.();
    } catch {
      // Error is handled by the hook and displayed below.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        {currentBudget ? "Update Budget" : "Set Budget"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Month */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Month
          </label>

          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4"
            required
          >
            <option value="">Select month</option>

            {months.map((item) => (
              <option key={item.value} value={item.value}>
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
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4"
            required
          >
            <option value="">Select year</option>

            {[currentYear - 1, currentYear, currentYear + 1].map(
              (item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Monthly Budget */}
      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Monthly Budget
        </label>

        <input
          type="number"
          value={monthlyBudget}
          onChange={(event) => setMonthlyBudget(event.target.value)}
          placeholder="e.g. 50000"
          min="0"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:px-4"
          required
        />
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {loading
          ? "Saving budget..."
          : currentBudget
            ? "Update Budget"
            : "Set Budget"}
      </button>
    </form>
  );
};

export default BudgetForm;