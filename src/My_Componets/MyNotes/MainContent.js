import React from "react";
import { Container, Row } from "react-bootstrap";
import "./mainPage.css";

const MainContent = ({ title, child }) => {
  return (
    <div className="mainPage container-fluid">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading m-auto p-3 d-flex justify-content-center  ">
                  {title}
                </h1>
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
