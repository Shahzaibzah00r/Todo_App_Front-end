import React, { useState, useEffect } from "react";
import MainContent from "./MainContent";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CreateNode from "./CreateNode";
import EditNodes from "./EditNodes";
import Footer from "../Footer/Footer";

const Mynotes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const localData = JSON.parse(localStorage.getItem("newData")) || "";

  const getDataServer = async () => {
    try {
      const localEmail = localData.userData.email;
      const response = await axios.post(
        "https://todo-application-backend-eight.vercel.app/users",
        { email: localEmail }
      );
      if (response.data) {
        setNotes(response.data.user);
      }
    } catch (error) {
      alert("Error fetching data from server.");
      console.log("Error:", error.message);
    }
  };

  const deleteHandlerBtn = async (event, id) => {
    event.preventDefault();
    const deleteConfirmed = window.confirm("Are you sure you want to delete?");
    if (deleteConfirmed) {
      try {
        const response = await axios.delete(
          `https://todo-application-backend-eight.vercel.app/users/${id}`
        );
        if (response.data) {
          alert("Node has been deleted");
          getDataServer(); // Update notes after deletion
        }
      } catch (error) {
        alert("Error deleting node.");
        console.log("Error:", error.message);
      }
    }
  };

  const handleCheckbox = async (noteId) => {
    try {
      const response = await axios.put(
        `https://todo-application-backend-eight.vercel.app/users/${noteId}`,
        { done: true }
      );
      if (response.data) {
        alert("Task has been completed");
        getDataServer(); // Update notes after checkbox toggle
      }
    } catch (error) {
      alert("Error updating task status.");
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    getDataServer(); // Fetch data on component mount
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <MainContent
      title={`Welcome back ${localData.userData.fName}`}
      child={
        <>
          <div className="d-flex justify-content-between align-items-center me-3">
            <CreateNode />
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search here..."
                  className="pe-5"
                  onChange={(e) => setSearch(e.target.value)}
                  title="Search bar"
                />
              </Col>
            </Row>
          </div>
          <div className="mt-3 col-sm-8 col-md-10 col-lg-12 row d-flex">
            {notes.length > 0 ? (
              notes
                .filter((note) =>
                  note.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((note) => (
                  <Accordion key={note._id}>
                    <Card className="m-1">
                      <Card.Header
                        className="d-flex"
                        style={{
                          backgroundColor: note.done ? "white" : "white",
                          border: note.done ? "2px solid green" : "none",
                        }}
                      >
                        <Form.Check
                          className="me-2 h4 m-auto"
                          checked={note.done}
                          type="checkbox"
                          disabled={note.done}
                          onClick={() => handleCheckbox(note._id)}
                          style={{ cursor: "pointer" }}
                        />
                        <span
                          style={{
                            color: "black",
                            fontSize: 25,
                            fontWeight: "bold",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                          }}
                        >
                          <Accordion.Header as={Card.Text} eventKey="0">
                            <div
                              style={{
                                fontSize: 22,
                                opacity: note.done ? "85%" : "100%",
                                textDecoration: note.done
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {note.title}
                            </div>
                          </Accordion.Header>
                        </span>
                        <div className="d-flex align-items-center">
                          <EditNodes child={note._id} disable={note.done} />
                          <Button
                            title="Delete-Node"
                            variant="danger"
                            size="sm"
                            onClick={(event) => deleteHandlerBtn(event, note._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Header>
                      <Accordion.Body eventKey="0">
                        <Card.Body>
                          <h4>
                            <Badge bg="success">{note.category}</Badge>
                          </h4>
                          <blockquote className="blockquote mb-0">
                            <p>{note.content}</p>
                            <footer className="blockquote-footer">
                              Created Date is:
                              <cite title="Source Title">
                                {note.currentDate}
                              </cite>
                            </footer>
                          </blockquote>
                        </Card.Body>
                      </Accordion.Body>
                    </Card>
                  </Accordion>
                ))
            ) : (
              <h2 className="text-center">No items to display...</h2>
            )}
          </div>
          <Footer />
        </>
      }
    />
  );
};

export default Mynotes;
