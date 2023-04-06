import {
  ArrowDownLeftIcon,
  ArrowUturnLeftIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error | undefined;

  return (
    <div className="error">
      <h1>Uh Oh! We"ve got a problem.</h1>
      <p>{error!.message}</p>
      <div className="flex-md">
        <button onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <span>Go Home</span>
          <HomeIcon width={20} />
        </Link>
      </div>
    </div>
  );
};

export default Error;
