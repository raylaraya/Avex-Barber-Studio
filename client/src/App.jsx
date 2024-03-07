import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Appointments from "./pages/appointmentsPage/Appointments";
import About from "./pages/aboutPage/About";
import Login from "./pages/loginPage/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
