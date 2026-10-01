import { useEffect, useState } from "react";
import { useExpenses } from "../hooks/useExpenses";
import UpsertModal from "../components/UpsertModal";

const Expense = () => {
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("add");
  const toggleModal = () => {
    setModal((isOpen) => !isOpen);
  };
  const { expenses, loading, error, getExpenses, deleteExpense } =
    useExpenses();
  const today = new Date();
  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === today.getMonth() &&
      expenseDate.getFullYear() === today.getFullYear()
    );
  });
  const totalSpending = currentMonthExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const openAddModal = () => {
    setExpenseToUpdate(null);
    setMode("add");
    setModal(true);
  };

  const handleDelete = (expenseId) => {
    if (window.confirm("Delete this expense?")) {
      deleteExpense(expenseId);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Expenses</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your daily expenses
            </p>
          </div>

          {/* button to open modal */}
          <button
            onClick={openAddModal}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add expense
          </button>
        </div>

        {/* Upsert Modal */}
        {modal && (
          <UpsertModal
            mode={mode}
            expenseToUpdate={expenseToUpdate}
            toggleModal={toggleModal}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">Loading expenses...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && expenses?.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No expenses yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Start by adding your first expense.
            </p>

            <button
              onClick={openAddModal}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add Expense
            </button>
          </div>
        )}

        {/* Expense List */}
        {!loading && !error && expenses?.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-semibold text-slate-900">Your Expenses</h2>
                <p className="text-sm font-semibold text-slate-900">
                  This Month: Rs. {totalSpending.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between p-5"
                >
                  <div>
                    <h3 className="font-medium text-slate-900">
                      {expense.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {expense.category} - {new Date(expense.date).toLocaleDateString("en-IN")}
                    </p>

                    {expense.note && (
                      <p className="mt-1 text-sm text-slate-500">{expense.note}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-5">
                    <p className="font-semibold text-slate-900">
                      ₹{expense.amount}
                    </p>

                    <button
                      onClick={() => {
                        setExpenseToUpdate(expense);
                        setMode("update");
                        toggleModal();
                      }}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;
