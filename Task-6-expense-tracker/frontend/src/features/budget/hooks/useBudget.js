import { useBudgetContext } from "../BudgetContext";

import {
  getBudgetApi,
  setBudgetApi,
  getBudgetHistoryApi,
} from "../services/budget.api";

export const useBudget = () => {
  const {
    setCurrentBudget,
    setBudgetHistory,
    error,
    setError,
    loading,
    setLoading,
  } = useBudgetContext();

  async function setBudget(budgetData) {
    setError(null);
    setLoading(true);

    try {
      const data = await setBudgetApi(budgetData);

      setCurrentBudget(data.budget);

      return data.budget;
    } catch (error) {
      const message =
        error.response?.data?.message || "failed to save budget";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getBudget() {
    setError(null);
    setLoading(true);

    try {
      const data = await getBudgetApi();

      setCurrentBudget(data.budget);

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "failed to get budget";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function getBudgetHistory() {
    setError(null);
    setLoading(true);

    try {
      const data = await getBudgetHistoryApi();

      setBudgetHistory(data.budgets);

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "failed to get budget history";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    setBudget,
    getBudget,
    getBudgetHistory,
    error,
    loading,
  };
};