import React from "react";
import { Col, Container, Row } from "react-bootstrap";
const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        width: "100%",
        bottom: "5px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col>Copyrights: &copy; Todo-APP</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
