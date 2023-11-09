import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MainContent from "../MyNotes/MainContent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loader/Loading";
import Errors from "../Errors/Errors";
import "./Login.css";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(null);
  const [loading, setLoading] = useState(null);

  const showAlert = (message, type) => {
    setIsError({ message: message, type: type });
    setTimeout(() => {
      setIsError(null);
    }, 1500);
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const loginGoogle = await axios.post(
          "http://localhost:5000/loginGoogle",
          // "https://todoapplication.up.railway.app/updateProfle",
          "https://todoapplication.up.railway.app/loginGoogle",
          tokenResponse,
          { headers: { Authorization: tokenResponse.access_token } }
        );
        setLoading(false);
        if (loginGoogle) {
          showAlert("User logged in", "success");
          navigate("/Mynotes");
          localStorage.setItem("newData", JSON.stringify(loginGoogle.data));
        }
      } catch (error) {
        showAlert("Invalid credentials", "danger");
      }
    },
    onError: (errorResponse) => showAlert("Invalid credentials", "danger"),
  });

  useEffect(() => {
    const info = localStorage.getItem("newData");
    if (info) {
      navigate("/Mynotes");
    }
  }, []);

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
        <section className="vh-80">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 py-2">
                <div className="socialLink">
                  <a
                    type="button"
                    onClick={() => login()}
                    className="btn btn-block   d-flex my-3 align-items-center justify-content-center  "
                    style={{ backgroundColor: "#dd4b39", color: "white" }}
                  >
                    <i className="fa fa-google mx-2 "></i> Sign in with Google
                  </a>
                </div>
                <div>
                  <a
                    className="btn btn-block   d-flex my-3 align-items-center justify-content-center "
                    style={{ backgroundColor: "#464646", color: "white" }}
                    // type="submit"
                  >
                    <i className="fa fa-github mx-2"></i>Sign in with GitHub
                  </a>
                </div>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <Form onSubmit={handleSubmit} method="POST">
                  {isError && (
                    <Errors child={isError.message} variant={isError.type} />
                  )}

                  <Form.Group
                    className="mb-4 "
                    controlId="formBasicEmail"
                    size="sm"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="mb-3"
                      value={email}
                      placeholder="Enter email"
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

                  <div className="d-flex  ">
                    <Button
                      variant="primary"
                      type="submit"
                      className="mb-3 me-3 d-flex"
                    >
                      Login
                      {loading && <Loading size="sm" />}
                    </Button>
                  </div>
                  <div>
                    No account? <Link to="/register">Create one!</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
      }
    />
  );
};

export default Login;
