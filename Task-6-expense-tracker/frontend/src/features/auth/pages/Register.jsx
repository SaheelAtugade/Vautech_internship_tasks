import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Register = () => {
  const { register, loading, error, clearError } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, []);

  const handleRegister = async (formData) => {
    try {
      await register(formData);

      navigate("/login");
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
            Start managing your expenses
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Create an account
          </h2>

          <p className="mt-1 mb-6 text-sm text-slate-500">
            Create your account to get started
          </p>

          <AuthForm
            type="register"
            onSubmit={handleRegister}
            loading={loading}
            error={error}
          />

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
