import React from "react";
import Navbar from "../../components/navbar/Navbar";
import AboutSection from "../../components/aboutSection/AboutSection";
import Footer from "../../components/footer/Footer";

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <AboutSection
        title="Our Story"
        paragraphs={[
          "Avex Barber Studio has been a cornerstone in Hamilton...",
          "Founded by Vinny Santiago in 2022, the shop quickly became...",
        ]}
        imageSrc="/shop.jpeg"
        additionalImages={[
          "/AvexHero.jpg",
          "/vinnyCutting.jpg",
          "/vinnyCutting2.jpg",
        ]}
      />
      <Footer />
    </div>
  );
};

export default About;
