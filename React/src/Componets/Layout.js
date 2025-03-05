import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../Styles/Layout.css";

const Layout = () => {
  const location = useLocation(); //React state-aware hook that should re-render when the route changes

  return (
    <div className="layout">
      <Outlet />
      {location.pathname !== "/" && (
        <h2>
          <Link to="/">Return to Home</Link>
        </h2>
      )}
    </div>
  );
};

export default Layout;
