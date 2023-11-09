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
  const localData = JSON.parse(localStorage.getItem("newData"));

  const getDataServer = async () => {
    try {
      const localEmain = localData.userData.email;
      const dataServer = await axios.post(
        // "http://localhost:5000/users",
        "https://todoapplication.up.railway.app/users",
        {
          email: localEmain,
        }
      );
      if (dataServer) {
        setNotes(dataServer.data.user);
      }
    } catch (error) {
      alert(error.message);
      console.log("Error:", error.message);
    }
  };

  const deleteHandlerBtn = async (event, id) => {
    event.preventDefault();
    const deleteYes = window.confirm("Are you sure...?");
    if (deleteYes) {
      try {
        const nodeDete = await axios.delete(
          // `http://localhost:5000/users/${id}`
          `https://todoapplication.up.railway.app/users/${id}`
        );
        if (nodeDete) {
          alert("Node has been deleted");
        }
      } catch (error) {
        alert("Can't be Deleted due to remote or server");
      }
    }
  };

  const handleCheckbox = async (noteId) => {
    const doneCheckBox = await axios.put(
      // "http://localhost:5000/users/" + noteId,
      "https://todoapplication.up.railway.app/users/" + noteId,
      { done: true }
    );
    if (doneCheckBox) {
      alert("Task has been completed");
    } else {
      alert("Server error");
    }
  };

  useEffect(() => {
    getDataServer();
  }, [handleCheckbox, deleteHandlerBtn]);

  return (
    <MainContent
      title={`Welcome back ${localData.userData.fName}`}
      child={
        <>
          <div
            // className="d-flex justify-content-between align-items-center me-3"
            className=" d-flex justify-content-between align-items-center me-3"
          >
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
                .filter((note) => {
                  if (search === "") {
                    return note;
                  } else if (
                    note.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return note;
                  }
                })
                .map((note) => {
                  return (
                    <Accordion>
                      <Card className="m-1">
                        <Card.Header
                          className="d-flex "
                          lege
                          style={
                            note.done === true
                              ? {
                                  backgroundColor: "white",
                                  border: "2px solid green",
                                }
                              : {
                                  backgroundColor: "white",
                                }
                          }
                        >
                          {/* <legend>General Information</legend> */}

                          <Form.Check
                            className="me-2 h4 m-auto"
                            checked={note.done}
                            type="checkbox"
                            disabled={note.done}
                            onClick={() => handleCheckbox(note._id)}
                            style={{
                              cursor: "pointer",
                            }}
                          />
                          <span
                            style={{
                              color: "black",
                              fontSize: 25,
                              fontWeight: "bold",
                              flex: 1,
                              cursor: "pointer",
                              alignSelf: "center",
                              // display: "flex",
                              // flexWrap: "wrap",
                            }}
                          >
                            <Accordion.Header
                              as={Card.Text}
                              eventKey="0"
                              // className="d-flex flex-wrap"
                            >
                              <div
                                style={
                                  note.done === true
                                    ? {
                                        fontSize: 22,
                                        opacity: "85%",
                                        textDecoration: "line-through",
                                        display: "flex",
                                        flexWrap: "wrap",
                                      }
                                    : {
                                        fontSize: 22,
                                        textDecoration: "none",
                                        display: "flex",
                                        flexWrap: "wrap",
                                      }
                                }
                              >
                                {note.title}
                              </div>
                            </Accordion.Header>
                          </span>
                          <div className="d-flex align-items-center flex-wrap">
                            <EditNodes child={note._id} disable={note.done} />
                            <Button
                              title="Delete-Node"
                              variant="danger"
                              size="sm"
                              onClick={(event) =>
                                deleteHandlerBtn(event, note._id)
                              }
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
                  );
                })
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
