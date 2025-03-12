import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./stylesregister.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [profilePic, setprofilePic] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setprofilePic(e.target.files[0]); //store selected file
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("age", age);
    formData.append("profilePic", profilePic);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("profilePic", data.profilePic);
        setMessage("Registration succesful! Redirecting to login....");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.error || "Something went wrong!");
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
          <label className="form-label">Profile Picture: </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
