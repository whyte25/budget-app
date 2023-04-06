import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layout/Main";
import Logout from "./pages/Logout";
import { logoutAction } from "./action/logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpensesPage, {
  ExpensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { BudgetAction, budgetLoader } from "./pages/BudgetPage";
import { deleteBudget } from "./action/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: ExpensesAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />,
        action: BudgetAction,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        element: <Logout />,
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      {" "}
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
