import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import './Product.css'
import { toast } from "react-toastify";
export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);
  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
     const existingProduct = cart.find((item) => item._id === product._id);

  if (existingProduct) {
    // Update qty if already in cart
    const updatedCart = cart.map((item) =>
      item._id === product._id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
    toast.info(`${product.productName} quantity updated 🛒`);
  } else {
    // Add new product with qty = 1
    setCart([...cart, { ...product, qty: 1 }]);
    toast.success(`${product.productName} added to cart`);
  }

  };
  return (
    <div className="product-container">
      {products &&
        products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.imgUrl} width={100}/>
            <h3>{product.productName}</h3>
            {/* <p>{product.description}</p> */}
            <h4>₹{product.price}/-</h4>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
    </div>
  );
}