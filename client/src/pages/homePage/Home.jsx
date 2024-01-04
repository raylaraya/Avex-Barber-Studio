import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import ServicesSection from "../../components/servicesSection/servicesSection";
import Footer from "../../components/footer/Footer";
import AboutSection from "../../components/aboutSection/AboutSection";
import { useEffect } from "react";
import ImageCarousel from "../../components/imageCarousel/ImageCarousel";

const homePageImages = [
  "/vinnyCutting2.jpg",
  "IMG_9045.jpg",
  "/IMG_7341.jpg",
  "IMG_7435.jpg",
  "haircut2.jpg",
  "beard.JPG",
  "enhancements.JPG",
  "IMG_9046.jpg",
  "IMG_9232.jpg",
  "haircut.JPG",
  "shapeUp.jpg",
  "taper.jpg",
  "/anthonyBeard.JPG",
  "newClient.jpg",
];

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
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
      <ImageCarousel images={homePageImages} />
      <Footer />
    </div>
  );
};

export default Home;
