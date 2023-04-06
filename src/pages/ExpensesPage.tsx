import React from "react";
import { useLoaderData } from "react-router-dom";
import { ExpensesProp, deleteExpense, fetchData } from "../utils";
import Table from "../components/Table";
import { toast } from "react-toastify";

export function expensesLoader() {
  const expenses: string = fetchData("expenses");
  return { expenses };
}

// loader
export async function ExpensesAction({ request }: { request: Request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

const ExpensesPage = () => {
  const { expenses } = useLoaderData() as { expenses: ExpensesProp[] };
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses?.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length}total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
