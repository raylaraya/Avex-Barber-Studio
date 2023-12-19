import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Appointments from "./pages/appointmentsPage/Appointments";
import About from "./pages/aboutPage/About";
import Gallery from "./pages/galleryPage/Gallery";
import Services from "./pages/servicesPage/Services";
import Contact from "./pages/contactPage/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
