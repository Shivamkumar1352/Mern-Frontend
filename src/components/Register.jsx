import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL
  const handleSubmit = (e)=>{
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/register`;
      const response = axios.post(url,user);
      console.log(response.data);
      toast.success("User registered sucessfully")
      setError("data saved successfully");
    } catch (err) {
      console.log(err.response?.data || err);
      setError("something went wrong");
      toast.error(error);
    }
  }

  return (
    <div className="register-container">
      <h1>Registration Form</h1>
      <form className="register-form">
        <p>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            onChange={(e)=>setUser({...user,firstName: e.target.value})}
          />
        </p>
        <p>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            onChange={(e)=>setUser({...user,lastName: e.target.value})}
          />
        </p>
        <p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={(e)=>setUser({...user,email: e.target.value})}
          />
        </p>
        <p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={(e)=>setUser({...user,password:e.target.value})}
          />
        </p>
        <button onClick={handleSubmit}>Register</button>
      </form>
      <hr />
      <Link to="/login">Login here...</Link>
    </div>
  );
};

export default Register;


