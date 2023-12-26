import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import ServicesSection from "../../components/servicesSection/servicesSection";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="hero-section">
        <h1>AVEX BARBER STUDIO</h1>
        <p>The ultimate grooming experience</p>
        <Link to="/appointments" className="book-button">
          Book an Appointment
        </Link>
      </div>
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Home;
