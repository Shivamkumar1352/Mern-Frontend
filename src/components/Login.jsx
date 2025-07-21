import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";
import "./Login.css";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${API_URL}/api/users/login`, loginData);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Email Address"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
          />
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
      <hr />
      <p style={{ textAlign: "center" }}>
        <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
}
