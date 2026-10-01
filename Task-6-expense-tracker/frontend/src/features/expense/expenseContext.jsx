import { createContext, useContext, useState } from "react";

export const ExpenseContext = createContext()

export const ExpenseContextProvider = ({children}) =>{

    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    return <ExpenseContext.Provider value={{expenses, setExpenses, error, setError, loading, setLoading}}>
        {children}
    </ExpenseContext.Provider>
}

export const useExpenseContext = () => useContext(ExpenseContext)