import React, { useState } from "react";
import './Cart.css'
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([])
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
   <div className="cart-container">
  <h2>My Cart</h2>
  {error && <div className="error">{error}</div>}

  {cart &&
    cart.map(
      (value) =>
        value.qty > 0 && (
          <div key={value._id} className="cart-item">
            <img
              src={value.imgUrl || "https://via.placeholder.com/100"}
              alt={value.productName}
            />
            <div className="item-details">
              <h4>{value.productName}</h4>
              <p>Price: ₹{value.price}</p>
              <div className="qty-controls">
                <button onClick={() => decrement(value._id, value.qty)}>-</button>
                <span>{value.qty}</span>
                <button onClick={() => increment(value._id, value.qty)}>+</button>
              </div>
              <p>Total: ₹{value.price * value.qty}</p>
            </div>
          </div>
        )
    )}

  <div className="order-summary">Order Value: ₹{orderValue}</div>

  <p>
    {user?.token ? (
      <button onClick={placeOrder}>Place Order</button>
    ) : (
      <button onClick={() => Navigate("/login")}>Login to Order</button>
    )}
  </p>
</div>
  );
}