import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MainContent from "../MyNotes/MainContent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loader/Loading";
import Errors from "../Errors/Errors";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const info = localStorage.getItem("newData");
    if (info) {
      navigate("/Mynotes");
    }
  }, []);

  const showAlert = (message, type) => {
    setIsError({ message: message, type: type });
    setTimeout(() => {
      setIsError(null);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const sendLogin = await axios
        // .post("http://localhost:5000/login", { email, password }, config)
        .post(
          "https://todoapplication.up.railway.app/login",
          { email, password },
          config
        );
      setLoading(false);

      if (sendLogin) {
        showAlert("User logged in", "success");
        navigate("/Mynotes");
        localStorage.setItem("newData", JSON.stringify(sendLogin.data));
      }
    } catch (error) {
      showAlert("Invalid email or password", "danger");
      setLoading(false);
    }
  };

  return (
    <MainContent
      title="LOGIN"
      child={
        <div className=" w-50  m-auto p-3 d-flex justify-content-center  border bg-light rounded">
          <Form
            onSubmit={handleSubmit}
            method="POST"
            className="loginBg w-100 mt-5"
            size="sm"
          >
            {isError && (
              <Errors child={isError.message} variant={isError.type} />
            )}
            <Form.Group className="mb-3 " controlId="formBasicEmail" size="sm">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                placeholder="Enter email"
                className="w-40"
                style={{ backgroundColor: "#f7efef" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                style={{ backgroundColor: "#f7efef" }}
              />
            </Form.Group>
            <div className=" d-flex align-items-center ">
              <Button
                variant="primary"
                type="submit"
                className="mb-3 me-3 d-flex "
              >
                Submit
              </Button>
              {loading && <Loading />}
            </div>
            <div>
              No account?{" "}
              <a id="signup" aria-label="Create a Microsoft account">
                <Link to="/register">Create one!</Link>
              </a>
            </div>
          </Form>
        </div>
      }
    />
  );
};

export default Login;
