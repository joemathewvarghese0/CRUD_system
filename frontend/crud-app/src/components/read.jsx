import "./stylesread.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//define the read component
const Read = () => {
  //state variable for storing fetched data and handling errors
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //fn to fetch data from the server
  async function getData() {
    const token = localStorage.getItem("token"); // get auth token

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include token in request
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch data");
      }

      setData(result); //set data if response is ok
    } catch (error) {
      setError(error.message);
    }
  }

  //fn to handle deletion of a user
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete user");
      }

      setError("User deleted successfully");

      //refresh after deletion
      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
},);

  //render the fetched data
  return (
    <div>
      {/* Display error message if there is an error*/}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {/* check if data is an array and not empty*/}
        {Array.isArray(data) && data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className="col-12 col-md-6 col-lg- mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Name: {ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Age: {ele.age}
                  </h6>
                  <p className="text-muted">Email: {ele.email}</p>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(ele.id)}>Delete</button>
                  <Link to={`/${ele._id}`} className="card-link">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default Read;
