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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex flexrow gap-4">
              <li className="nav-item">
                <Link className="nav-link fw-bold" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/all">
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
