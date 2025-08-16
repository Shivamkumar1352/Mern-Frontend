import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css"; // Import the CSS file

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setUser({});
    toast.success("logged out successfully")
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      await axios.patch(url, form);
      fetchProfile();
      setError("Data saved successfully.");
      toast.success("Profile updated successfully")
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setError("Something went wrong");
    }
  };

  return (
    <div className="profile-container">
      <h3 className="profile-heading">My Profile</h3>

      <button className="profile-button profile-logout-btn" onClick={logout}>
        Logout
      </button>

      <div className="profile-form">
        <input
          className="profile-input"
          name="firstName"
          type="text"
          onChange={handleChange}
          defaultValue={profile.firstName}
          placeholder="First Name"
        />
        <input
          className="profile-input"
          name="lastName"
          type="text"
          onChange={handleChange}
          defaultValue={profile.lastName}
          placeholder="Last Name"
        />
        <input
          className="profile-input"
          name="email"
          type="text"
          onChange={handleChange}
          defaultValue={profile.email}
          placeholder="Email"
        />
        <input
          className="profile-input"
          name="password"
          type="password"
          onChange={handleChange}
          defaultValue={profile.password}
          placeholder="Password"
        />
        <button className="profile-button" onClick={handleSubmit}>
          Update Profile
        </button>
      </div>
    </div>
  );
}
