import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div>
      <h1>MERN Frontend</h1>
      <Link to="/">Home</Link>-<Link to="/cart">MyCart</Link>-
      <Link to="/order">MyOrder</Link>-<Link to="/admin">Admin</Link>-
      <Link to="/login">Login</Link>
    </div>
  );
}