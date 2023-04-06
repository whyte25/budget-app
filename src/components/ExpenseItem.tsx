import React from "react";
import {
  ExpensesProp,
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../utils";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({
  expense,
  showBudget,
}: {
  expense: ExpensesProp;
  showBudget: any;
}) => {
  const { name, amount, createdAt, budgetId } = expense;

  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: budgetId,
  })[0];

  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDateToLocaleString(createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${name} expense`}
          >
            <TrashIcon width={15} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
