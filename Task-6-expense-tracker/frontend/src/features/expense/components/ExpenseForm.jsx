import { useEffect, useState } from "react";
import { useExpenses } from "../hooks/useExpenses";

const ExpenseForm = ({ mode, expenseToUpdate, onSuccess }) => {
  const {
    createExpense,
    updateExpense,
    loading,
    error,
  } = useExpenses();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  // Fill form when editing an existing expense
  useEffect(() => {
    if (mode === "update" && expenseToUpdate) {
      setFormData({
        title: expenseToUpdate.title,
        amount: expenseToUpdate.amount,
        category: expenseToUpdate.category,
        date: expenseToUpdate.date?.slice(0, 10) || "",
        note: expenseToUpdate.note || "",
      });
    }

    if (mode === "add") {
      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
        note: "",
      });
    }
  }, [mode, expenseToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      ...formData,
      amount: Number(formData.amount),
    };

    try {
      if (mode === "update") {
        await updateExpense(expenseToUpdate._id, expenseData);
      } else {
        await createExpense(expenseData);
      }

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
        note: "",
      });
      onSuccess?.();
    } catch {
      // The hook stores the API error for this form to display.
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6"
    >
      <h2 className="mb-5 text-lg font-semibold text-slate-900 capitalize">
        {mode} Expense
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Groceries"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g. 500"
            min="1"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Note (optional)
          </label>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="e.g. Monthly grocery shopping"
            rows="3"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? mode === "update"
            ? "Updating..."
            : "Adding..."
          : mode === "update"
            ? "Update Expense"
            : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
