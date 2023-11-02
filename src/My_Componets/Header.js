// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

// function Header() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container fluid>
//         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           >
//             <Nav.Link href="#action1">Home</Nav.Link>
//             <Nav.Link href="#action2">Link</Nav.Link>
//             <NavDropdown title="Link" id="navbarScrollingDropdown">
//               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action4">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action5">
//                 Something else here
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link href="#" disabled>
//               Link
//             </Nav.Link>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-success">Search</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }
import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../My_Componets/links.css";
import { useEffect, useState } from "react";
function Header() {
  const navigate = useNavigate();
  const [lcData, setLcData] = useState();

  const btnLogout = (e) => {
    e.preventDefault();
    const isData = localStorage.getItem("newData");
    if (isData) {
      localStorage.clear();
      navigate("/");
    }
  };

  const localData = JSON.parse(localStorage.getItem("newData"));
  useEffect(() => {
    if (localData) {
      const firstLtr = localData.userData.fName.slice(0, 1).toUpperCase();
      const fullName = firstLtr + localData.userData.fName.slice(1);
      setLcData(fullName);
    }
  }, [btnLogout, setLcData, localData]);
  return (
    <Navbar expand="lg" style={{ color: "black" }} variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <Link to="/" className="links">
            To-Do-APP
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className=" me-auto ms-4 my-lg-0">
            {localData ? (
              <>
                <Nav.Link href="/mynotes">
                  <Link to="/mynotes" className="links navItems ">
                    My-Notes
                  </Link>
                </Nav.Link>
              </>
            ) : (
              ""
            )}
          </Nav>

          <Nav className=" me-2 " style={{ maxHeight: "100px" }} navbarScroll>
            {localData ? (
              <NavDropdown
                title={lcData}
                id="navbarScrollingDropdown"
                className=" me-5 "
              >
                <NavDropdown.Item href="profile">
                  <Link to="/profile" className="links navItems">
                    My Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={btnLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav>
                <Nav.Link href="/login">
                  <Link to="/login" className="links navItems">
                    Sign in
                  </Link>
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
