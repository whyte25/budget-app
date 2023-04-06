import { ExpensesProp } from "../utils";
import ExpenseItem from "./ExpenseItem";

const Table = ({
  expenses,
  showBudget = true,
}: {
  expenses: ExpensesProp[];
  showBudget?: any;
}) => {
  return (
    <div className="table">
      <>
        <table>
          <thead>
            <tr>
              {["Name", "Amount", "Date", `${showBudget ? "Budget" : ""}`].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <tr key={i}>
                <ExpenseItem expense={expense} showBudget={showBudget} />
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default Table;
