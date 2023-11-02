import Header from "./My_Componets/Header";
// import Footer from "./My_Componets//Footer/Footer";
import LandingPage from "./My_Componets/LadingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import Mynotes from "./My_Componets/MyNotes/Mynotes";
import Register from "./My_Componets/Users/Register";
import Login from "./My_Componets/Users/Login";
import Profile from "./My_Componets/Users/Profile";
import CreateNode from "./My_Componets/MyNotes/CreateNode";
import EditNodes from "./My_Componets/MyNotes/EditNodes";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mynotes" element={<Mynotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mynotes/newnode" element={<CreateNode />} />
        <Route path="/mynotes/:id" element={<EditNodes />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
