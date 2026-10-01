import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / Greeting */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Expense Tracker
          </h2>

          <p className="text-sm text-slate-500">
            Hello, {user?.name}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/expense"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Expenses
          </NavLink>

          <NavLink
            to="/budget"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Budget
          </NavLink>

          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
