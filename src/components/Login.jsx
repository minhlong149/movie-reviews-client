import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name, id });
    navigate(-1);
  };

  return (
    <Form onSubmit={handleLogin} className="mx-auto w-50 mt-5">
      <FloatingLabel label="Enter your user ID" className="mb-3">
        <Form.Control
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel label="Enter your name" className="mb-3">
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FloatingLabel>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Login;
