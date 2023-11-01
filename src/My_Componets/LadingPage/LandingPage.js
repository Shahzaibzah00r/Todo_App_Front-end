import React from "react";
import Container from "react-bootstrap/Container";
import "./landingPage.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="mainContent">
            <div>
              <h1 className="title mt-3">
                Welcome to our{" "}
                <span className="spanMain">
                  {" "}
                  <br />
                  To-Do-APP
                </span>
              </h1>
            </div>
            <div className="buttons mt-5">
              <Link to="/login">
                <Button
                  variant="success"
                  className="me-5"
                  size="lg"
                  href="/login"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="warning"
                  size="lg"
                  id="logout"
                  href="/register"
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
