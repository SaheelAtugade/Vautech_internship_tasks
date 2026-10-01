import { useBudgetContext } from "../BudgetContext";
import { getBudgetApi, setBudgetApi } from "../services/budget.api";

export const useBudget = () => {
  const { setCurrentBudget, error, setError, loading, setLoading } =
    useBudgetContext();

  async function setBudget(monthlyBudget) {
    setError(null);
    setLoading(true);
    try {
      const data = await setBudgetApi(monthlyBudget);
      // Save the returned budget directly in shared context.
      setCurrentBudget(data.budget);
      return data.budget;
    } catch (error) {
        const message = error.response?.data?.message || "failed to save budget"
        setError(message)
        throw error
    }finally{
        setLoading(false)
    }
  }

  async function getBudget(){
    setError(null)
    setLoading(true)
    try {
        const data = await getBudgetApi()
        // `budget` is either one budget object or null for a new user.
        setCurrentBudget(data.budget)
        return data
    } catch (error) {
        const message = error.response?.data?.message || "failed to get budget"
        setError(message)
        throw error
    }finally{
        setLoading(false)
    }
  }

  return{
    setBudget,
    getBudget,
    error,
    loading
  }
};
