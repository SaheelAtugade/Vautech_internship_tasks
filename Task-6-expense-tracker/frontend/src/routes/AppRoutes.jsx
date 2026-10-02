import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Expense from "../features/expense/pages/Expense";
import Budget from "../features/budget/pages/Budget";
import Reports from "../features/report/pages/reports";

const AppRoutes = createBrowserRouter([
  // Public routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Protected routes
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "expense",
        element: <Expense/>
      },
      {
        path: "budget",
        element: <Budget/>,
      },
      {
        path: "report",
        element: <Reports/>,
      }
    ],
  },
]);

export default AppRoutes;
