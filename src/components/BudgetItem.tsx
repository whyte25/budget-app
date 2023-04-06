import React from "react";
import type { BudgetProp } from "../pages/Dashboard";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../utils";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

declare module "react" {
  interface CSSProperties {
    "--accent"?: string;
  }
}

const BudgetItem = ({
  budget,
  showDelete = false,
}: {
  budget: BudgetProp;
  showDelete?: boolean;
}) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3 style={{ textTransform: "capitalize" }}>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event: HTMLFormElement) => {
              if (
                !confirm(
                  "Are you sure you want to permantly delete this budget"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link className="btn" to={`/budget/${id}`}>
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
