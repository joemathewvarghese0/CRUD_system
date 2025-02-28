import './App.css';
import Create from './components/Create';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Update from './components/update';
import Read from './components/read';

//def the main app component
function App() {
  return ( 
    <Router>
      <div className="App">
        <Navbar/>  {/*including navbar component*/}
        <Routes/>   {/*including routes for the application*/}
        <Routes>
          <Route path="/" element={<Create/>}/>{/*Route for creating a new user*/}
          <Route path="/all" element={<Read/>}/>{/*Route for reading all users*/}
          <Route path="/:id" element={<Update/>}/>{/*Route for updating a specific user by id*/}
         </Routes>
      </div>
    </Router>
  );
}


export default App;