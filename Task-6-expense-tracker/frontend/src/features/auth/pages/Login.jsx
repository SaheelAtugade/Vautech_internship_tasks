import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const { login, loading, error, clearError } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, []);

  const handleLogin = async (formData) => {
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      // Hook handles the error state.
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Expense Tracker</h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your expenses easily
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Welcome back</h2>

          <p className="mt-1 mb-6 text-sm text-slate-500">
            Login to your account
          </p>

          <AuthForm
            type="login"
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
