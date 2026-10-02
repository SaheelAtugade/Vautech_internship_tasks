# Expense Tracker

A full-stack expense management application built with React, Node.js, Express, and MongoDB.

The application allows users to create an account, manage their expenses, set a monthly budget, and track their monthly spending from a simple dashboard.

## Features

- User Registration & Login
- JWT-based authentication using cookies
- Protected routes
- Dashboard with expense summary
- Add expenses
- View expenses
- Update expenses
- Delete expenses
- Monthly budget management
- Calculate monthly spending
- Calculate remaining budget
- Recent expenses
- Responsive design for mobile and desktop
- REST API
- MongoDB database

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS

## Project Structure

```text
expense-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── expense/
│   │   │   └── budget/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── public/
│   ├── app.js
│   └── package.json
│
└── README.md