import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Admin() {
  return (
    <div>
        <nav>
        <Link to="users">Users</Link> -
        <Link to="products">Products</Link> -
        <Link to="orders">Orders</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}

export default Admin