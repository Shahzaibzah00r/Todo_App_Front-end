import React from "react";
import { Container, Row } from "react-bootstrap";
import "./mainPage.css";

const MainContent = ({ title, child }) => {
  return (
    <div className="mainPage" style={{ backgroundColor: "#f7f5ee" }}>
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {child}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainContent;
