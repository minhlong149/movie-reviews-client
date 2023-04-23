import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

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
      <Navbar bg="light" expand="lg">
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
    </div>
  );
}

export default App;
