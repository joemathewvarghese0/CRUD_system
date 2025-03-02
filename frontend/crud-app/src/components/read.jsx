import "./styles3.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//define the read component
const Read = () => {
    //state variable for storing fetched data and handling errors
    const[data, setData] = useState("");
    const[error, setError] = useState("");

    //fn to fetch data from the server
    async function getData() {
        const response = await fetch("http://localhost:5000");

        const result = await response.json();

        //handle eerors if response is not okay
        if(!response.ok) {
            setData(result);
        }
        //if response ok
        if(response.ok) {
            setData(result);
        }
    }

      //fn to handle deletion of a user
    const handleDelete = async(id) => {
        const response = await fetch(`http://localhost:5000/${id}`,{
            method: "DELETE"
        });

        const result = await response.json();


        //handle errors if the response is not ok
        if(!response.ok) {
            console.log(result.error);
            setError(result.error);
        }

       //handle errors if the response is ok
       if(response.ok) {
        setError("Data deleted successfully");

        //refresh after deletion
        setTimeout(() => {
            setError("");
            getData();
        }, 2000);
    }

    }

    //useEffect hook to fetch data when the component is mounted
    useEffect(() => {
        getData();
    },[]);

    console.log(data);

    //render the fetched data
    return(
        <div>
            {/* Display error message if there is an error*/}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {/* check if data is an array and not empty*/}
                {Array.isArray(data) && data.length > 0 ? (data.map((ele) => (
                    <div key={ele._id} className="col-12 col-md-6 col-lg- mb-4">
                        <div className="card text-center">
                          <div className="card-body">
                              <h5 className="card-title">Name: {ele.name}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">Age: {ele.age}</h6>
                              <p className="text-muted">Email: {ele.email}</p>
                              <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}>Delete</a>
                              <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                          </div>
                        </div>
                    </div>     
                ))): (
                    <div>No data available</div>
                )}
            </div>
        </div>
    );
};

export default Read;