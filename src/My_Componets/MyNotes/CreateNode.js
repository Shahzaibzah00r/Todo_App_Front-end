import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Errors from "../Errors/Errors";
import Loading from "../Loader/Loading";
// import Markdown from "react-markdown";
// import { Accordion, Card } from "react-bootstrap";

function CreateNode() {
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notes, setNotes] = useState({
    title: "",
    content: "",
    category: "",
    email: "",
  });
  const localData = JSON.parse(localStorage.getItem("newData"));
  const localEmail = localData.userData.email;

  const setShowAlert = (message, type) => {
    setError({ message: message, type: type });
    setTimeout(() => {
      setError(null);
      setShow(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("localEmail in new notes:", localEmail);
      setLoader(true);

      const postNotes = await axios.post(
        // "http://localhost:5000/users/post",
        "https://todoapplication.up.railway.app/users/post",
        notes
      );
      // .catch((err) => {
      //   console.log("err  submitted:", err);
      // });

      if (postNotes) {
        setLoader(false);
        setShowAlert("Data successfully submitted", "success");
      }
    } catch (error) {
      setError({
        message: `This data is already exists or completed: ${error.response.data.Data}`,
        type: "danger",
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    setNotes({ ...notes, email: localEmail });
  }, []);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="ms-3 p-2 px-3 fw-bold"
        size="sm"
      >
        Create New Note
      </Button>

      <Modal show={show} onHide={handleClose}>
        {error && <Errors child={error.message} variant={error.type} />}
        <Modal.Header closeButton>
          <Modal.Title>Create NewNode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} method="submit">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(e) => setNotes({ ...notes, title: e.target.value })}
                placeholder="Tilte of node..."
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(e) =>
                  setNotes({ ...notes, category: e.target.value })
                }
                placeholder="Category of node..."
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) =>
                  setNotes({ ...notes, content: e.target.value })
                }
                placeholder="Body of node..."
              />
            </Form.Group>
            <div className="d-flex ">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="ms-auto me-3"
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="d-flex">
                Insert Node
                {loader && <Loading size="sm" />}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateNode;
