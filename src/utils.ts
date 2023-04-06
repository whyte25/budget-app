const generatedRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// local storage
export const fetchData = (key: string) => {
  if (typeof key !== "string") {
    throw new Error("Key must be a string");
  }

  return JSON.parse(localStorage.getItem(key) as string);
};

// get all item from local storage
export const getAllMatchingItems = ({
  category,
  key,
  value,
}: {
  category: string;
  key: string;
  value: string;
}) => {
  const data = fetchData(category) ?? [];
  return data.filter((item: any) => item[key] === value);
};

// delete item from local storage
export const deleteExpense = ({
  key,
  id,
}: {
  key: string;
  id: FormDataEntryValue;
}) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item: any) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// create budget
export const createBudget = ({
  name,
  amount,
}: {
  name: FormDataEntryValue;
  amount: FormDataEntryValue;
}): void => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: generatedRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create expenses
export const createExpense = ({
  name,
  amount,
  budgetId,
}: {
  name: FormDataEntryValue;
  amount: FormDataEntryValue;
  budgetId: FormDataEntryValue;
}): void => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const deleteItem = ({ key }: { key: string }) => {
  return localStorage.removeItem(key);
};

export interface ExpensesProp {
  budgetId: string;
  id: string;
  color: string;
  createdAt: number;
  name: string;
  amount: number;
}

// total spent by budget
export const calculateSpentByBudget = (budgetId: string) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc: number, expenses: ExpensesProp) => {
    // check if expenses.id ===budgetId I passed in
    if (expenses.budgetId !== budgetId) return acc;
    return (acc += expenses.amount);
  }, 0);
  return budgetSpent;
};

export const formatPercentage = (amt: number) => {
  return amt.toLocaleString("en-us", {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatCurrency = (amt: number) => {
  return amt.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocaleString = (epoch: number) =>
  new Date(epoch).toLocaleString();
