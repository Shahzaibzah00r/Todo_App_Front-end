import React from "react";
import Alert from "react-bootstrap/Alert";
const Errors = ({ child = "hello by default", variant = "danger" }) => {
  return (
    <div>
      <Alert variant={variant} style={{ fontSize: 18, fontWeight: "bold" }}>
        {child}
      </Alert>
    </div>
  );
};

export default Errors;
