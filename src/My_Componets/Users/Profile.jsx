import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Errors from "../Errors/Errors";
import Loading from "../Loader/Loading";
import Footer from "../Footer/Footer";

const Profile = () => {
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const message = JSON.parse(localStorage.getItem("newData"));
  var imgRef = useRef(null);

  if (message) {
    console.log("message:", message);
    const token = message.userData.token;
    var secure_url = message.userData.profilePic;

    const setShowAlert = (message, type) => {
      setError({ message: message, type: type });
      setTimeout(() => {
        setError(null);
        // setShow(false);
      }, 2000);
    };

    var hanldeProfileUpdate = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fName", fName);
      formData.append("lName", lName);
      formData.append("email", email);
      formData.append("token", token);
      const config = {
        // "Content-Type": "application/json",
        "content-type": "multipart/form-data",
        Authorization: `${token}`,
      };
      try {
        setLoading(true);
        const updateProfle = await axios.patch(
          // "http://localhost:5000/updateProfle",
          "https://todoapplication.up.railway.app/updateProfle",
          formData,
          { config }
        );
        setLoading(false);

        if (updateProfle) {
          setShowAlert("Data has been updated successfully", "success");
          console.log("updateProfle", updateProfle.data);
          localStorage.setItem("newData", JSON.stringify(updateProfle.data));
          navigate("/profile");
        }
      } catch (error) {
        setShowAlert("Data couldn't updated", "danger");
        console.log("error: ", error.response.data);
      }
    };

    var selectImg = () => {
      imgRef.current.click();
    };
    var setSelectedImage = (event) => {
      setImage(event.target.files[0]);
    };
  } else {
    navigate("/");
  }
  useEffect(() => {
    if (message) {
      setFirstName(message.userData.fName);
      setLastName(message.userData.lName);
      setEmail(message.userData.email);
    }
  }, []);

  return (
    <>
      <div className="container px-4 mt-3 mb-4">
        {error && <Errors child={error.message} variant={error.type} />}

        <hr className=" mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-3 ">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {file ? (
                  <img
                    ref={imgRef}
                    className=" mb-2"
                    onClick={selectImg}
                    src={URL.createObjectURL(file)}
                    alt="profile_picture"
                    style={{
                      height: "275px",
                      width: "275px",
                      cursor: "pointer",
                      borderRadius: "100%",
                    }}
                  />
                ) : (
                  <img
                    className=" mb-2"
                    ref={imgRef}
                    onClick={selectImg}
                    src={secure_url}
                    alt="profile_picture"
                    style={{
                      height: "275px",
                      width: "275px",
                      cursor: "pointer",
                      borderRadius: "100%",
                    }}
                  />
                )}
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 2 MB
                </div>
                <div>
                  <input
                    onChange={setSelectedImage}
                    type="file"
                    id="img"
                    name="img"
                    accept="extension(gif,.jpg,)"
                    ref={imgRef}
                    style={{ display: "none" }}
                  ></input>
                  <Button onClick={selectImg}>Upload</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form onSubmit={hanldeProfileUpdate}>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={fName}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lName}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="small mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      value={email}
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                    />
                  </div>
                  <div className="d-flex ">
                    <Button variant="primary" type="submit" className="d-flex">
                      Save changes
                      {loading && <Loading size="sm" />}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
