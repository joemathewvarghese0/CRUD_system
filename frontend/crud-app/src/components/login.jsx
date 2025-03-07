import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styleslogin.css";

const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if(response.ok) {
            localStorage.setItem("token", data.token);
            onLogin();
            navigate("/create");
        } else {
            setError(data.message || "Invalid credentials");
        }
    } catch (error) {
        setError("Something went wrong. Please try again");
    }

  };

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      {error && <div className="error-message" style={{color: "red"}}>{error}</div>}
      <form onSubmit={handleLogin}>
        <label className="form-label">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      
      <p>
        Create an account! <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
};

export default Login;
