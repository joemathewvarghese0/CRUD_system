import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Define the update component
const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  //extract userid from the url parameters
  const { id } = useParams();

  //hook for navigation
  const navigate = useNavigate();

  //fn to fetch a single user's data based on the id
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);

    const result = await response.json();

    //handle errors if the response is !ok
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    //handle success if the response is ok
    if (response.ok) {
      setError("");
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  //fn to handle form submission for updating user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    //prepare the updated user data
    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    //handle errors if the response is !ok
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      navigate("/all");
    }
  };

  //useEffect hook to fetch single user data when the coponent is mounted
  useEffect(() => {
    getSingleUser();
  }, []);

  //render the form for updating user data
  return (
    <div>
      {/* Display error message if there is an error */}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
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
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
