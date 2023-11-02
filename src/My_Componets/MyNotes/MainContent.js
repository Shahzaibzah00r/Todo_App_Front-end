import React from "react";
import { Container, Row } from "react-bootstrap";
import "./mainPage.css";

const MainContent = ({ title, child }) => {
  return (
    <div className="mainPage">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading mt-4">{title}</h1>
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
