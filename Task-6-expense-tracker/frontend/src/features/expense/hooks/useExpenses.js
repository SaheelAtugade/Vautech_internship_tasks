import { useExpenseContext } from "../ExpenseContext"
import { createExpenseApi, deleteExpenseApi, getExpenseApi, updateExpenseApi } from "../services/expense.api"

export const useExpenses = ()=>{

    const {expenses, error, loading, setExpenses, setError, setLoading} = useExpenseContext()

    async function createExpense(expenseData) {
        setError(null)
        setLoading(true)
        try {
            const data = await createExpenseApi(expenseData)
            const newExpense = data.expense
            setExpenses((prev)=>[...prev, newExpense])
            return data
        } catch (error) {
            const message = error.response?.data?.message || "failed to create expense"
            setError(message)
            throw error
        }finally{
            setLoading(false)
        }
    }

    async function getExpenses() {
        setError(null)
        setLoading(true)
        try {
            const data = await getExpenseApi()
            setExpenses(data.expenses)
            return data
        } catch (error) {
            const message = error.response?.data?.message || "failed to fetch expenses"
            setError(message)
            throw error
        }finally{
            setLoading(false)
        }
    }

    async function deleteExpense(deleteId) {
        setError(null)
        setLoading(true)
        try {
             await deleteExpenseApi(deleteId)
            await getExpenses()
        } catch (error) {
            const message = error.response?.data?.message || "failed to delete expense"
            setError(message)
        }finally{
            setLoading(false)
        }
    }

    async function updateExpense(updateID, expenseData) {
        setError(null)
        setLoading(true)
        try {
            const data = await updateExpenseApi(updateID, expenseData)
             await getExpenses()
            return data
        } catch (error) {
            const message = error.response?.data?.message || "failed to update expense"
            setError(message)
            throw error
        }finally{
            setLoading(false)
        }
    }

    return{
        expenses, error, loading, 
        createExpense, getExpenses, deleteExpense, updateExpense
    }
}
