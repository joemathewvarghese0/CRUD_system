import "./styles.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//define the create component
const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  //variables for handling errors
  const [error, setError] = useState("");
  // hook for navigation
  const navigate = useNavigate();

  //fn to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //create a new user object
    const addUser = { name, email, age };

    //send a POST request to the server to create a new user
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //parse the JSON response from the server
    const result = await response.json();

    //Handle errors if the response is not OK
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    //Handle success if the response is  OK
    if (response.ok) {
      console.log(result.error);
      setError("");
      setAge(0);
      setEmail("");
      setName("");
      navigate("/all");
    }
  };

  return (
    <div className="container">
      {/* Display error message if there is an error*/}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            classname="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            classname="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
