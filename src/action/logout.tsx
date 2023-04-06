import { redirect } from "react-router-dom";
import { deleteItem } from "../utils";
import { toast } from "react-toastify";

export const logoutAction = () => {
  // delete the user
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  toast.success("You've successfully deleted your account");
  return redirect("/");
};
