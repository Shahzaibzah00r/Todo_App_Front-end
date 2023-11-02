import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Errors from "../Errors/Errors";
import Loading from "../Loader/Loading";

function EditNodes(props) {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loader, setLoader] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
  });

  const setShowAlert = (message, type) => {
    setError({ message: message, type: type });
    setTimeout(() => {
      setError(null);
      setShow(false);
    }, 1500);
  };

  const handleShow = async (e) => {
    e.preventDefault();
    setShow(true);
    try {
      // alert(props.child);
      const getDataServer = await axios.get(
        // "http://localhost:5000/users/" + props.child
        "https://todoapplication.up.railway.app/users/" + props.child
      );
      // console.log("Edited", getDataServer.data.User);
      if (getDataServer) {
        setNote(getDataServer.data.User);
      }
    } catch (error) {
      setShowAlert("Can't be fetched from server", "danger");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const dataSubmited = await axios.put(
        // "http://localhost:5000/users/" + props.child,
        "https://todoapplication.up.railway.app/users/" + props.child,
        note
      );

      setLoader(false);
      if (dataSubmited) {
        setShowAlert("Data successfully Updated", "success");
      }
    } catch (error) {
      setLoader(false);
      setShowAlert("Data coudln't be Updated", "danger");
      // console.log("Error while putting data to server:", error);
    }
  };
  return (
    <>
      <Button
        variant="primary"
        disabled={props.disable}
        onClick={handleShow}
        className="mx-2 p-2 px-3 "
        size="sm"
        title="Edit-Node"
      >
        Edit
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
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                placeholder="Tilte of node..."
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                value={note.category}
                type="text"
                onChange={(e) => setNote({ ...note, category: e.target.value })}
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
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
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
                Update Node
                {loader && <Loading size="sm" />}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default EditNodes;
