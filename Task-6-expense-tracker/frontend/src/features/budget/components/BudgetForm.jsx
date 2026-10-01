import { useEffect, useState } from "react";
import { useBudget } from "../hooks/useBudget";

const BudgetForm = ({ currentBudget, onSuccess }) => {
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const { error, loading, setBudget } = useBudget();

  // Fill the input when the user is updating an existing budget.
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
      className="rounded-xl border border-slate-200 bg-white p-6"
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        required
      />

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving budget..." : currentBudget ? "Update Budget" : "Set Budget"}
      </button>
    </form>
  );
};

export default BudgetForm;
