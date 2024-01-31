import React from "react";
import Navbar from "../../components/navbar/Navbar";
import AboutSection from "../../components/aboutSection/AboutSection";
import Footer from "../../components/footer/Footer";

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <AboutSection
        title="OUR STORY"
        paragraphs={[
          "Our founder, Vinny Santiago, transformed his dream into a reality at just 23 years old with the opening of his very own Avex Barber Studio. More than just a business, the studio stands as a testament to the countless hours and sacrifices Vinny has invested to make this vision tangible. His adventure in barbering began on November 2, 2017, marking the start of a profound journey of personal and professional growth.",
          "Vinny's commitment runs deep. He has dedicated thousands of hours to perfecting his craft, but equally important, he has fostered lasting and meaningful connections with his clients. Avex Barber Studio is not merely a result of his hard work and dedication. It's a celebration of his unwavering commitment to excellence and a powerful reminder that with true passion and perseverance, any dream can be sculpted into reality.",
        ]}
        imageSrc="/IMG_6974.jpg"
        additionalImages={[
          "/IMG_6977.jpg",
          "/AvexHero.jpg",
          "/vinnyCutting.jpg",
        ]}
        linkTo="/appointments"
        linkText="BOOK NOW"
      />
      <Footer />
    </div>
  );
};

export default About;
