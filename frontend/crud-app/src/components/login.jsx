import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styleslogin.css";

const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
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
            localStorage.setItem("userId", data.user._id);
            localStorage.setItem("profilePic", data.user.profilePic);


            //fetch user data to get the profile pics
            fetchUserData(data.user._id);

            onLogin();
            navigate("/");
        } else {
            setError(data.message || "Invalid credentials");
        }
    } catch (error) {
        setError("Something went wrong. Please try again");
    }

  };

  //fn to fetch user data
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const userData = await response.json();
      if(response.ok) {
        setProfilePic(userData.profilePic);
      }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
    // fetch profile picture on page load if user is already loggedin
    useEffect(() => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        fetchUserData(storedUserId);
      } else {
        console.warn("No stored user ID found.");
      }
    }, []);

    useEffect(() => {
      const storedProfilePic = localStorage.getItem("profilePic");
      if (storedProfilePic) {
          setProfilePic(`http://localhost:5000/uploads/${storedProfilePic}`);
      }
  }, []);

    useEffect(() => {
      console.log("Profile Pic URL:", profilePic); // Debugging
    }, [profilePic]);

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      
      {profilePic && (
        <div className="profile-pic-container">
        <img src={profilePic}
        alt="Proflie"
        className="profile-pic"/>
        </div>
      )}
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
