import React, { useRef, useEffect } from "react";
import type { BudgetProp } from "../pages/Dashboard";
import { useFetcher } from "react-router-dom";
import { CurrencyDollarIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }: { budgets: BudgetProp[] }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef<HTMLFormElement | null>(null);
  const focusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      focusRef.current?.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && budgets.map((budg) => budg.name)}
        </span>{" "}
        Expenses
      </h2>
      <fetcher.Form method="post" ref={formRef} className="grid-sm">
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g, Coffee"
              required
              ref={focusRef}
            />
            <div className="grid-xs">
              <label htmlFor="newExpenseAmount">Amount</label>
              <input
                type="number"
                required
                step="0,01"
                name="newExpenseAmount"
                placeholder="e.g., 3.50"
                inputMode="decimal"
              />
            </div>
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length == 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudegt" required>
            <>
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  );
                })}
            </>
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
