import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { jwtDecode } from "jwt-decode";
import { FaLock, FaUserAlt } from "react-icons/fa";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          username,
          password,
        }
      );
      const { token } = response.data; // Assuming the response includes only the token
      localStorage.setItem("token", token); // Storing the token in localStorage

      const { user } = response.data;
      const user_type_id = user.userTypeId;

      if (user_type_id === "2") {
        window.location.href = "/InstitutionRepresentative";
      } // Add more conditions for other user types if needed
    } catch (error) {
      console.error("Login error", error);
      // Handle login error (e.g., showing an alert or message)
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUserAlt className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
