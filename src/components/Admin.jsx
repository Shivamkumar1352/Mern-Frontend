import React from "react";
import './Admin.css';
import { Outlet, Link } from "react-router-dom";
export default function Admin() {
  return (
    <div className="admin-container">
      <div className="admin-nav">
        <Link to="/admin">Users</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>
      <div className="admin-outlet">
        <Outlet />
      </div>
    </div>
  );
}