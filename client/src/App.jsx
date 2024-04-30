import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Appointments from "./pages/appointmentsPage/Appointments";
import About from "./pages/aboutPage/About";
import Login from "./pages/loginPage/Login";
import SignUp from "./pages/signUpPage/SignUp";
import Booking from "./pages/bookingPage/Booking";
import BookedAppointments from "./pages/viewBookedAppointments/BookedAppointments";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/appointments/book" element={<Booking />} />
          <Route
            path="/appointments/viewbookings"
            element={<BookedAppointments />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
