import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="hero-section">
        <h1>AVEX BARBER STUDIO</h1>
        <p>The ultimate grooming experience</p>
        {/* <p>Experience the best grooming service</p> */}
        <Link to="/appointments" className="book-button">
          Book an Appointment
        </Link>
      </div>
      {/* Add other sections here */}
    </div>
  );
};

export default Home;
