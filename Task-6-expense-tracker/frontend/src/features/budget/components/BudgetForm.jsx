import { useEffect, useState } from "react";
import { useBudget } from "../hooks/useBudget";

const BudgetForm = ({ currentBudget, onSuccess }) => {
  const [monthlyBudget, setMonthlyBudget] = useState("");

  const { error, loading, setBudget } = useBudget();

  useEffect(() => {
    setMonthlyBudget(currentBudget?.monthlyBudget ?? "");
  }, [currentBudget]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await setBudget(Number(monthlyBudget));
      onSuccess?.();
    } catch {
      // The hook stores the API error for the form to display.
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

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

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