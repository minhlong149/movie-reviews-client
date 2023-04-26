import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";

import AddReview from "./components/AddReview.jsx";
import Login from "./components/Login.jsx";
import Movie from "./components/Movie.jsx";
import MoviesList from "./components/MoviesList.jsx";

function App() {
  const [user, setUser] = useState(null);

  function login(user = null) {
    console.log("login");
    setUser(user);
  }

  function logout() {
    console.log("logout");
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg" className="px-5 py-3">
        <Navbar.Brand as={Link} to="/">
          Movie Reviews
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>
            {user === null ? (
              <Nav.Link as={Link} to="/login" onClick={login}>
                Login
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/" onClick={logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path={"/"} element={<MoviesList />} />
        <Route path={"movies"} element={<MoviesList />} />
        <Route path={"movies/:id"} element={<Movie />} />
        <Route path={"movies/:id/review"} element={<AddReview />} />
        <Route path={"login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
