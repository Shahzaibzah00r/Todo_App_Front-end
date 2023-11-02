import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MainContent from "../MyNotes/MainContent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loader/Loading";
import Errors from "../Errors/Errors";
// import "../links.css";

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
      console.log("Info is:", info);
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
      await axios
        // .post("http://localhost:5000/login", { email, password }, config)
        .post(
          "https://todoapplication.up.railway.app/login",
          { email, password },
          config
        )
        .then((res) => {
          if (res.data) {
            showAlert("User logged in", "success");
            navigate("/Mynotes");
            localStorage.setItem("newData", JSON.stringify(res.data));
            
          } else {
            console.log("Invalid credentials from server");
            showAlert("Credentials from server", "danger");
          }
        });
      setLoading(false);
    } catch (error) {
      alert(error.message);
      // showAlert("Invalid credentials from catch statement", "danger");
      setLoading(false);
    }
    // }
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
              <Button variant="outline-secondary" className="mb-5 " size="sm">
                <Link to="/register" className="links">
                  Click me register
                </Link>
              </Button>
            </div>
          </Form>
        </div>
      }
    />
  );
};

export default Login;
