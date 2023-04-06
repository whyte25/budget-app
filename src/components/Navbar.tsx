import React from "react";
import { Form, NavLink } from "react-router-dom";
import logo from "../assets/logomark.svg";
import { TrashIcon } from "@heroicons/react/24/solid";

interface NavProp {
  userName: string;
}

const Navbar = ({ userName }: NavProp) => {
  return (
    <nav>
      <NavLink to="/">
        <img src={logo} alt={"logo"} />
        <span>HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event: SubmitEvent) => {
            if (!confirm("Delete user and all data")) {
              event.preventDefault();
            }
          }}
        >
          <button className=" btn btn--warning" type="submit">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Navbar;
