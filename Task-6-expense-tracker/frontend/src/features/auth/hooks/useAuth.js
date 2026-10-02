import { useAuthContext } from "../AuthContext";
import { getMeApi, loginApi, logoutApi, registerApi } from "../services/auth.api";

export const useAuth = () => {
  const { setLoading, setError, loading, error, user, setUser } = useAuthContext();

  async function register(userData) {
    setError(null);
    setLoading(true);
    try {
      const data = await registerApi(userData);
      setUser(data.user)
      return data;
    } catch (error) {
          console.log(error);
      const message = error.response?.data?.message || "Registration failed";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function login(userData) {
    setError(null);
    setLoading(true);
    try {
      const data = await loginApi(userData);
      setUser(data.user)
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function fetchUser() {
    setLoading(true);
    try {
      const data = await getMeApi();
      setUser(data.user)
    } catch (error) {
      setUser(null)
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function logout(){
    setError(null)
    setLoading(true)
    try {
      await logoutApi()
      setUser(null)
    } catch (error) {
      const message = error.response?.data?.message || "logout failed"
      setError(message)
    }finally{
      setLoading(false)
    }
  }

  const clearError = ()=>{
    setError(null)
  }

  return {
    register,
    login,
    logout,
    fetchUser,
    loading,
    error,
    user,
    clearError
  }
};
