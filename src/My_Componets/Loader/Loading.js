import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({ size = "lg" }) => {
  return (
    <div>
      <Spinner animation="border" role="status" size={size} className="ms-1">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
