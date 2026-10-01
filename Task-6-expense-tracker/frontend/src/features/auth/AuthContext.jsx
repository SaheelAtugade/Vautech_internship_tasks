import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    //states
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    return <AuthContext.Provider value={{user, error, setError, setLoading, setUser, loading}}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)