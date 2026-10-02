import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./features/auth/AuthContext.jsx";
import AuthInitializer from "./features/auth/components/AuthInitializer.jsx";
import { BudgetContextProvider } from "./features/budget/BudgetContext.jsx";
import { ExpenseContextProvider } from "./features/expense/ExpenseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AuthInitializer>
        <ExpenseContextProvider>
          <BudgetContextProvider>
            <App />
          </BudgetContextProvider>
        </ExpenseContextProvider>
      </AuthInitializer>
    </AuthContextProvider>
  </StrictMode>,
);
