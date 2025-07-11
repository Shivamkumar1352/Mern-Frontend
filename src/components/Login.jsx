import React, {useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const API_URL = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
  e.preventDefault(); 
  try {
    const url = `${API_URL}/api/users/login`;
    const response = await axios.post(url, { email, password });
    console.log(response.data);
    setError("Login successful");
  } catch (err) {
    console.error(err.response?.data || err);
    setError("Something went wrong");
  }
};

  return (
    <div className="login-container">
      <h1>Login Form</h1>
      {error}
      <form className="login-form" onSubmit={handleSubmit}>
        <p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </p>
        <p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>
        <button type="submit">Login</button>
      </form>
      <hr />
      <Link to="/register">Create an Account...</Link>
    </div>
  );
}

export default Login;
