import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stylesregister.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try{
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, age }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Registration succesful! Redirecting to login....");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setMessage(data.error || "something went wrong!");
    }
} catch (error) {
    setMessage("Server error: " + error.message);
}
  };

  return (
    <div className="register-container">
      <h2>REGISTER</h2>
      <form onSubmit={handleRegister}>
      <label className="form-label">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <label className="form-label">Age:</label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
