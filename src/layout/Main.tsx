import React from "react";
import { fetchData } from "../utils";
import { Outlet, useLoaderData } from "react-router-dom";
import wave from "../assets/wave.svg";
import Navbar from "../components/Navbar";

// loader
export function mainLoader() {
  const userName: string = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData() as { userName: string };

  return (
    <div className="layout">
      <Navbar userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="wave" />
    </div>
  );
};

export default Main;
