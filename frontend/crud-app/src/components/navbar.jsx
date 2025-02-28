import "./styles1.css";
import React from "react";
import { Link } from "react-router-dom";

//define navbar component
const Navbar = () => {
  return (
    <div>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/*Navbar toggle button for mobile view*/}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle-navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/*Collapisble navbar content*/}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row gap-3 list-unstyled">
              {/* Navbar link to home page*/}
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  MERN
                </Link>
              </li>
              {/* Navbar link to create post page*/}
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Create Post
                </Link>
              </li>
              {/* Navbar link to All post page*/}
              <li className="nav-item">
                <Link to="/all" className="nav-link">
                  All Post
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
