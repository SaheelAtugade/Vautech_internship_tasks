import { useExpenseContext } from "../../expense/ExpenseContext";
import { useBudgetContext } from "../../budget/BudgetContext";

export const useReports = () => {
  const { expenses } = useExpenseContext();
  const { currentBudget, budgetHistory } = useBudgetContext();

  // Get expenses for a particular month and year
  const getMonthExpenses = (month, year) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() + 1 === Number(month) &&
        expenseDate.getFullYear() === Number(year)
      );
    });
  };

  // --------------------------------------------------
  // 1. MONTHLY EXPENSE SUMMARY
  // --------------------------------------------------

  const getMonthlySummary = (month, year) => {
    const monthlyExpenses = getMonthExpenses(month, year);

    const spent = monthlyExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );

    const budget = budgetHistory.find(
      (item) =>
        Number(item.month) === Number(month) &&
        Number(item.year) === Number(year)
    );

    const budgetAmount = budget ? Number(budget.monthlyBudget) : 0;

    const difference = budgetAmount - spent;

    let status = "No Budget";

    if (budget) {
      if (difference < 0) {
        status = "Exceeded";
      } else if (difference === 0) {
        status = "Budget Reached";
      } else {
        status = "Within Budget";
      }
    }

    return {
      month: Number(month),
      year: Number(year),
      budget: budgetAmount,
      spent,
      remaining: difference > 0 ? difference : 0,
      exceeded: difference < 0 ? Math.abs(difference) : 0,
      totalExpenses: monthlyExpenses.length,
      status,
    };
  };

  // --------------------------------------------------
  // 2. CATEGORY-WISE EXPENSE REPORT
  // --------------------------------------------------

  const getCategoryReport = (month, year) => {
    const monthlyExpenses = getMonthExpenses(month, year);

    const categories = [
      "Food",
      "Travel",
      "Shopping",
      "Entertainment",
      "Bills",
      "Other",
    ];

    return categories.map((category) => {
      const categoryExpenses = monthlyExpenses.filter(
        (expense) => expense.category === category
      );

      const total = categoryExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );

      return {
        category,
        total,
        count: categoryExpenses.length,
      };
    });
  };

  // --------------------------------------------------
  // 3. MONTHLY EXPENSE COMPARISON
  // --------------------------------------------------

  const getMonthlyComparison = () => {
    const months = {};

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);

      const month = expenseDate.getMonth() + 1;
      const year = expenseDate.getFullYear();

      const key = `${year}-${month}`;

      if (!months[key]) {
        months[key] = {
          month,
          year,
          spent: 0,
        };
      }

      months[key].spent += Number(expense.amount);
    });

    budgetHistory.forEach((budget) => {
      const key = `${budget.year}-${budget.month}`;

      if (!months[key]) {
        months[key] = {
          month: Number(budget.month),
          year: Number(budget.year),
          spent: 0,
        };
      }

      months[key].budget = Number(budget.monthlyBudget);
    });

    return Object.values(months)
      .map((item) => {
        const budget = item.budget || 0;
        const spent = item.spent || 0;

        return {
          month: item.month,
          year: item.year,
          budget,
          spent,
          remaining: budget - spent > 0 ? budget - spent : 0,
          exceeded: budget - spent < 0 ? Math.abs(budget - spent) : 0,
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year;
        }

        return b.month - a.month;
      });
  };

  // --------------------------------------------------
  // 4. BUDGET VS ACTUAL SPENDING
  // --------------------------------------------------

  const getBudgetVsActual = (month, year) => {
    const monthlyExpenses = getMonthExpenses(month, year);

    const spent = monthlyExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );

    const budget = budgetHistory.find(
      (item) =>
        Number(item.month) === Number(month) &&
        Number(item.year) === Number(year)
    );

    const budgetAmount = budget ? Number(budget.monthlyBudget) : 0;

    const difference = budgetAmount - spent;

    let percentageUsed = 0;

    if (budgetAmount > 0) {
      percentageUsed = (spent / budgetAmount) * 100;
    }

    return {
      month: Number(month),
      year: Number(year),
      budget: budgetAmount,
      actualSpending: spent,
      remaining: difference > 0 ? difference : 0,
      exceeded: difference < 0 ? Math.abs(difference) : 0,
      percentageUsed: Number(percentageUsed.toFixed(2)),
      status:
        !budget
          ? "No Budget"
          : difference < 0
            ? "Exceeded"
            : difference === 0
              ? "Budget Reached"
              : "Within Budget",
    };
  };

  // --------------------------------------------------
  // 5. HIGHEST EXPENSES
  // --------------------------------------------------

  const getHighestExpenses = (month, year, limit = 5) => {
    const monthlyExpenses = getMonthExpenses(month, year);

    return [...monthlyExpenses]
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .slice(0, limit);
  };

  // --------------------------------------------------
  // 6. EXPENSE HISTORY
  // --------------------------------------------------

  const getExpenseHistory = (
    month = null,
    year = null,
    category = "All"
  ) => {
    let filteredExpenses = [...expenses];

    // Filter by month and year
    if (month && year) {
      filteredExpenses = getMonthExpenses(month, year);
    }

    // Filter by category
    if (category !== "All") {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === category
      );
    }

    // Latest expenses first
    return filteredExpenses.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  };

  // --------------------------------------------------
  // COMMON HELPERS
  // --------------------------------------------------

  const getMonthName = (month) => {
    return new Date(2000, Number(month) - 1).toLocaleString("en-IN", {
      month: "long",
    });
  };

  const getAvailableMonths = () => {
    const months = [];

    // Months from expenses
    expenses.forEach((expense) => {
      const date = new Date(expense.date);

      months.push({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    });

    // Months from budgets
    budgetHistory.forEach((budget) => {
      months.push({
        month: Number(budget.month),
        year: Number(budget.year),
      });
    });

    // Remove duplicate months
    const uniqueMonths = months.filter(
      (item, index, array) =>
        array.findIndex(
          (other) =>
            other.month === item.month &&
            other.year === item.year
        ) === index
    );

    // Latest month first
    return uniqueMonths.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }

      return b.month - a.month;
    });
  };

  return {
    currentBudget,

    expenses,

    budgetHistory,

    getMonthExpenses,

    getMonthlySummary,

    getCategoryReport,

    getMonthlyComparison,

    getBudgetVsActual,

    getHighestExpenses,

    getExpenseHistory,

    getMonthName,

    getAvailableMonths,
  };
};