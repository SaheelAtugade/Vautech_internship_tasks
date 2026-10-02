import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-600"
        : "text-slate-600 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">

        {/* Logo / Greeting */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-slate-900">
            Expense Tracker
          </h2>

          <p className="text-sm text-slate-500">
            Hello, {user?.name}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end md:gap-6">
          
          <NavLink to="/" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/expense" className={navLinkClass}>
            Expenses
          </NavLink>

          <NavLink to="/budget" className={navLinkClass}>
            Budget
          </NavLink>

          <NavLink to="/report" className={navLinkClass}>
            Reports
          </NavLink>

          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 transition-colors hover:text-red-700"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;