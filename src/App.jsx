import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register.jsx";
import Product from "./components/Product.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Order from "./components/Order.jsx";
import Admin from "./components/Admin.jsx";
import Users from "./components/Users.jsx";
import Products from "./components/Products.jsx";
import Orders from "./components/Orders.jsx";

function App() {
  return (
    <div className="App-Container">
      <BrowserRouter>
        <h1>MERN Frontend</h1>
        <nav>
        <Link to="/">Home</Link>-<Link to="/login">Login</Link>-
        <Link to="/register">Register</Link>-<Link to="/cart">My Cart</Link>-
        <Link to="/order">Order</Link>-<Link to="/admin">Admin</Link>
        </nav> 
        <Routes>
  <Route index element={<Product />} />
  <Route path="/" element={<Product />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/order" element={<Order />} />

  <Route path="/admin" element={<Admin />}>
    <Route path="users" element={<Users />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<Orders />} />
  </Route>
</Routes>

        <h3>This is footer</h3>
      </BrowserRouter>
    </div>
  );
}
export default App;
