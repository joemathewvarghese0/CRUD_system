import "./App.css";
import Create from "./components/Create";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Update from "./components/update";
import Read from "./components/read";
import Login from "./components/login";
import Register from "./components/register";
import { useState, useEffect } from "react";

//def the main app component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    //check if token exist in localstorage
    const token = localStorage.getItem("token");
    if(token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        )}
        <Routes>
          {!isAuthenticated ? (
            // Login route when user is NOT authenticated
            <>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/create" element={<Create />} />
              {/*Route for creating a new user*/}
              <Route path="/all" element={<Read />} />
              {/*Route for reading all users*/}
              <Route path="/:id" element={<Update />} />
              {/*Route for updating a specific user by id*/}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
