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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-5 text-center sm:mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Expense Tracker
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Start managing your expenses
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
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