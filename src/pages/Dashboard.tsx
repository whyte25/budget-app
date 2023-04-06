import React from "react";
import {
  ExpensesProp,
  createBudget,
  createExpense,
  deleteExpense,
  fetchData,
  wait,
} from "../utils";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// loader
export function dashboardLoader() {
  const userName: string = fetchData("userName");
  const budgets: string = fetchData("budgets");
  const expenses: string = fetchData("expenses");
  return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }: { request: Request }) {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      throw new Error("There was a problem creating your account");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      toast.success("budget created");
    } catch (error) {
      throw new Error("There was a problem creating budget");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      toast.success(`Expense ${values.newExpense} created!`);
    } catch (error) {
      throw new Error("There was a problem creating expense");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteExpense({
        key: "expenses",
        id: values.expenseId,
      });
      toast.success(`Expense deleted!`);
    } catch (error) {
      throw new Error("There was a problem deleting expense");
    }
  }
}

export interface BudgetProp {
  id: string;
  color: string;
  createdAt: number;
  name: string;
  amount: number;
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData() as {
    userName: string;
    budgets: BudgetProp[];
    expenses: ExpensesProp[];
  };

  return userName ? (
    <div className="dashboard">
      <h1>
        Welcome back, <span className="accent">{userName}</span>
      </h1>
      <div className="grid-sm">
        {budgets && budgets.length > 0 ? (
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            <h2>Existing Budgets</h2>
            <div className="budgets">
              {budgets.map((budget) => (
                <BudgetItem key={budget.id} budget={budget} />
              ))}
            </div>
            {expenses?.length > 0 && (
              <div className="grid-md">
                <h2>Recent Expenses</h2>
                <Table
                  expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
                />
                {expenses.length >= 5 && (
                  <Link to="expenses" className="btn btn--dark">
                    View all expenses
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid-sm">
            <p>Personal budgeting is the secret to financial freedom</p>
            <p>Create a budget to get started</p>
            <AddBudgetForm />
          </div>
        )}
      </div>
    </div>
  ) : (
    <Intro />
  );
};

export default Dashboard;
