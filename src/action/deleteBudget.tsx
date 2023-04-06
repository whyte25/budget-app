import { toast } from "react-toastify";
import { ExpensesProp, deleteExpense, getAllMatchingItems } from "../utils";
import { redirect } from "react-router-dom";

export const deleteBudget = ({ params }: any): Response => {
  try {
    deleteExpense({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense: ExpensesProp) => {
      deleteExpense({
        key: "expenses",
        id: expense.id,
      });
    });
    toast.success("Budget deleted successfully");
  } catch (error) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/");
};
