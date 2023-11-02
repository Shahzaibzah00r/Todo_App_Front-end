import React, { useState } from "react";
import MainContent from "../MyNotes/MainContent";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const registerRes = await axios.post("http://localhost:5000/register/", {
      const registerRes = await axios.post(
        "https://todoapplication.up.railway.app/register/",
        {
          fName,
          lName,
          email,
          password,
          cPassword,
        }
      );
      if (registerRes) {
        console.log("registerRes:", registerRes);
        navigate("/login");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
      console.log("error in register res:", error);
    }
  };

  return (
    <MainContent
      title="Register new user"
      child={
        <>
          <div className=" w-50 d-flex justify-content-center border bg-light m-auto p-5 rounded">
            <Form onSubmit={handleSubmit} className="loginBg w-100 mt-2">
              {/* <Row className="mb-3"> */}
              <Form.Group as={Col} controlId="formGridText1">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter FirstName"
                  required
                  onChange={(e) => setFName(e.target.value)}
                />
              </Form.Group>
              {/* </Row>
            <Row className="mb-3"> */}
              <Form.Group as={Col} controlId="formGridText2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLName(e.target.value)}
                  placeholder="Enter LastName"
                />
              </Form.Group>
              {/* </Row> */}
              {/* <Row className="mb-3"> */}
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
              {/* </Row> */}
              {/* <Row className="mb-3"> */}
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
              {/* </Row> */}
              {/* <Row>
               */}
              <div className="d-flex">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 me-3 d-flex "
                >
                  Submit
                </Button>

                <p className="mt-2 me-3">
                  already have acc?<span> </span>
                  <Button
                    variant="outline-secondary"
                    // className="mt-3 "
                    size="sm"
                    className="loginBg me-3 links d-flex"
                  >
                    <Link to="/login" className="links">
                      Click me login
                    </Link>
                  </Button>
                </p>
              </div>
            </Form>

            {/* <div>
              <Button
                variant="outline-secondary"
                className="mt-3 "
                size="sm"
                // className="loginBg me-3 links d-flex"
              >
                <Link to="/login" className="links">
                  Click me login?
                </Link>
              </Button>
            </div> */}
          </div>
        </>
      }
    />
  );
};

export default Register;
