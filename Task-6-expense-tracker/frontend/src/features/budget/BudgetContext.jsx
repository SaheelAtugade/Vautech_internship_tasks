import { createContext, useContext, useState } from "react";

export const BudgetContext = createContext()
export const BudgetContextProvider = ({children})=>{
    const [currentBudget, setCurrentBudget] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    return <BudgetContext.Provider value={{currentBudget, setCurrentBudget, error, setError, loading, setLoading}}>
        {children}
    </BudgetContext.Provider>
}

export const useBudgetContext = ()=> useContext(BudgetContext)