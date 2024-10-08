import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import ServicesSection from "../../components/servicesSection/ServicesSection";
import Footer from "../../components/footer/Footer";
import AboutSection from "../../components/aboutSection/AboutSection";
import { useEffect } from "react";
import ImageCarousel from "../../components/imageCarousel/ImageCarousel";

const homePageImages = [
  "newClient.jpg",
  "/vinnyCutting2.jpg",
  "IMG_9045.jpg",
  "/IMG_7341.jpg",
  "IMG_7435.jpg",
  "haircut2.jpg",
  "beard.JPG",
  "IMG_9232.jpg",
  "haircut.JPG",
  "shapeUp.jpg",
  "taper.jpg",
  "anthonyBeard.JPG",
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
      </div>
      <h2 className="services-header">SERVICES WE PROVIDE</h2>
      <ServicesSection />
      <AboutSection
        title="About Avex Barber Studio"
        paragraphs={[
          "Welcome to Avex Barber Studio! Located at 33 White Horse Avenue in Hamilton, New Jersey, our barbershop was brought to life on November 7th, 2022 through the passion and ambition of our owner, Vinny Santiago. Vinny is not only highly skilled and dedicated to his craftsmanship but also dedicated to building lasting relationships with his clients and giving back to the community.",
          "For more information on Avex Barber Studio and its owner press the button below.",
        ]}
        imageSrc="/IMG_6962.jpg"
        linkTo="/about"
        linkText="Learn More"
      />
      <ImageCarousel images={homePageImages} />
      <Footer />
    </div>
  );
};

export default Home;
