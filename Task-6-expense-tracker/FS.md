src/
│
├── assets/
│
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Card.jsx
│   │   └── Loader.jsx
│   │
│   └── layout/
│       ├── Navbar.jsx
│       ├── Sidebar.jsx
│       └── AppLayout.jsx
│
├── features/
│   │
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── components/
│   │   │   └── AuthForm.jsx
│   │   │
│   │   ├── services/
│   │   │   └── authService.js
│   │   │
│   │   └── hooks/
│   │       └── useAuth.js
│   │
│   ├── expense/
│   │   ├── pages/
│   │   │   └── Expenses.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseItem.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   └── ExpenseModal.jsx
│   │   │
│   │   ├── services/
│   │   │   └── expenseService.js
│   │   │
│   │   └── hooks/
│   │       └── useExpenses.js
│   │
│   ├── budget/
│   │   ├── components/
│   │   │   ├── BudgetCard.jsx
│   │   │   └── BudgetForm.jsx
│   │   │
│   │   ├── services/
│   │   │   └── budgetService.js
│   │   │
│   │   └── hooks/
│   │       └── useBudget.js
│   │
│   ├── dashboard/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   └── components/
│   │       ├── SummaryCards.jsx
│   │       ├── RecentExpenses.jsx
│   │       └── BudgetOverview.jsx
│   │
│   └── user/
│       ├── pages/
│       │   └── Profile.jsx
│       │
│       └── components/
│           └── ProfileCard.jsx
│
├── services/
│   └── api.js
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── hooks/
│
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css