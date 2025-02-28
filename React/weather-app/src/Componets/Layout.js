import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <h2>
        <Link to="/">Return to Home</Link>
      </h2>
    </div>
  );
};

export default Layout;
