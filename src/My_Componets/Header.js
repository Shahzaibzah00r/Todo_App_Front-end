import { Container, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
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
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="/">
          <Link to="/" className="links" title="Todo-App">
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

          <Nav style={{ maxHeight: "100px" }} navbarScroll>
            {localData ? (
              <>
                <NavDropdown
                  title={lcData}
                  id="navbarScrollingDropdown"
                  className=" me-1 "
                >
                  <NavDropdown.Item href="profile">
                    <Link to="/profile" className="links navItems">
                      My Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={btnLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <img
                  className=" my-auto"
                  src={localData.userData.profilePic}
                  style={{
                    height: "35px",
                    width: "35px",
                    cursor: "pointer",
                    borderRadius: "100%",
                  }}
                />
              </>
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
