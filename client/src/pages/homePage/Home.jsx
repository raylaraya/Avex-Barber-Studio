import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import ServicesSection from "../../components/servicesSection/servicesSection";
import Footer from "../../components/footer/Footer";
import AboutSection from "../../components/aboutSection/AboutSection";

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
      <AboutSection
        title="About Avex Barber Studio"
        paragraphs={[
          "Welcome to Avex Barber Studio! Located at 33 White Horse Avenue in Hamilton, New Jersey, our barbershop was brought to life on November 7th, 2022 through the passion and ambition of our owner, Vinny Santiago. Vinny is not only highly skilled and dedicated to his craftsmanship but also dedicated to building lasting relationships with his clients and giving back to the community.",
          "For more information on Avex Barber Studio and its owner press the button below.",
        ]}
        imageSrc="/shop.jpeg"
        linkTo="/about"
        linkText="Learn More"
      />
      <Footer />
    </div>
  );
};

export default Home;
