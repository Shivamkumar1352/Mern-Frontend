import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import './Header.css';

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header>
      <div className="header-container">
        <h1 className="logo">🛍️ Bazaar</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/order">Orders</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          {user?.token ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
