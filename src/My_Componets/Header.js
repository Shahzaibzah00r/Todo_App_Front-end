import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../My_Componets/links.css";
import { useEffect, useState } from "react";
function Header() {
  const navigate = useNavigate();
  const [lcData, setLcData] = useState();

  // console.log(localData.userData.fName);

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
      setLcData(localData.userData.fName);
    }
  }, [btnLogout, setLcData, localData]);
  // console.log(localData);s
  return (
    <Navbar expand="lg" style={{ color: "black" }} variant="dark" bg="dark">
      <Container className="d-flex">
        <Navbar.Brand href="/">
          <Link to="/" className="links">
            To-Do-APP
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className=" d-flex justify-content-between"
        >
          <Nav>
            <Nav.Link href="/">
              <Link to="/" className="links navItems">
                Home
              </Link>
            </Nav.Link>
            {localData ? (
              <Nav.Link href="/mynotes">
                <Link to="/mynotes" className="links navItems">
                  My-Notes
                </Link>
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
          <Nav
            className=" my-2 my-lg-0 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {localData ? (
              <NavDropdown title={lcData} id="navbarScrollingDropdown">
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
