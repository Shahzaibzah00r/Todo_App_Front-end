import React, { useState } from "react";
import MainContent from "../MyNotes/MainContent";
import { Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Errors from "../Errors/Errors";
import Loading from "../Loader/Loading";

const Register = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isError, setIsError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setIsError({ message: message, type: type });
    setTimeout(() => {
      setIsError(null);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const registerRes = await axios.post("http://localhost:5000/register/", {
      setLoading(true);
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
      setLoading(false);
      if (registerRes) {
        navigate("/login");
      }
    } catch (error) {
      showAlert("This email is already rigistered", "danger");
      setLoading(false);
    }
  };

  return (
    <MainContent
      title="Register new user"
      child={
        <>
          <div className=" m-auto col-sm-12 col-md-10 col-lg-6 d-flex justify-content-center border bg-light m-auto p-3 rounded">
            <Form onSubmit={handleSubmit} className="loginBg w-100 mt-1">
              {isError && (
                <Errors child={isError.message} variant={isError.type} />
              )}

              <Form.Group as={Col} controlId="formGridText1">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "#f7efef" }}
                  type="text"
                  placeholder="Enter FirstName"
                  required
                  onChange={(e) => setFName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridText2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "#f7efef" }}
                  type="text"
                  onChange={(e) => setLName(e.target.value)}
                  placeholder="Enter LastName"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Enter Email</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "#f7efef" }}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "#f7efef" }}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "#f7efef" }}
                  type="password"
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>

              <div className=" d-flex align-items-center ">
                <Button
                  variant="primary"
                  type="submit"
                  className="mb-2 me-3 mt-3 d-flex "
                >
                  Submit
                  {loading && <Loading size="sm" />}
                </Button>
              </div>
              <div>
                Already Have account?
                <Link to="/login">Click me login</Link>
              </div>
            </Form>
          </div>
        </>
      }
    />
  );
};

export default Register;
