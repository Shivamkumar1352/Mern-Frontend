import React, { useState, useEffect, useContext } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Increment quantity
  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  // Decrement quantity
  const decrement = (id, qty) => {
    if (qty <= 1) {
      // Remove item if qty goes to 0
      const updatedCart = cart.filter((product) => product._id !== id);
      setCart(updatedCart);
    } else {
      const updatedCart = cart.map((product) =>
        product._id === id ? { ...product, qty: qty - 1 } : product
      );
      setCart(updatedCart);
    }
  };

  // Calculate order value safely
  useEffect(() => {
    if (cart.length > 0) {
      setOrderValue(
        cart.reduce((sum, value) => {
          const qty = value.qty || 0;
          const price = value.price || 0;
          return sum + qty * price;
        }, 0)
      );
    } else {
      setOrderValue(0);
    }
  }, [cart]);

  // Place order
  const placeOrder = async () => {
    try {
      if (cart.length === 0) {
        toast.warning("Your cart is empty 🛒");
        return;
      }

      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };

      await axios.post(url, newOrder);

      setCart([]);
      toast.success("Order placed successfully! ✅");
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      toast.error("Failed to place order ❌");
    }
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {error && <div className="error">{error}</div>}

      {/* Empty cart check */}
      {cart.length === 0 || cart.every((item) => !item.qty || item.qty === 0) ? (
        <div className="empty-cart">🛒 Your cart is empty</div>
      ) : (
        <>
          {cart.map(
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
                      <button onClick={() => decrement(value._id, value.qty)}>
                        -
                      </button>
                      <span>{value.qty}</span>
                      <button onClick={() => increment(value._id, value.qty)}>
                        +
                      </button>
                    </div>
                    <p>Total: ₹{(value.price || 0) * (value.qty || 0)}</p>
                  </div>
                </div>
              )
          )}

          <div className="order-summary">Order Value: ₹{orderValue}</div>

          <p>
            {user?.token ? (
              <button onClick={placeOrder}>Place Order</button>
            ) : (
              <button
                onClick={() => Navigate("/login")}
                disabled={cart.length === 0}
              >
                Login to Order
              </button>
            )}
          </p>
        </>
      )}
    </div>
  );
}
