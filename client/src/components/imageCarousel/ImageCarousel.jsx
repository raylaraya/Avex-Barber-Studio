import React, { useEffect, useState } from "react";
import "./image-carousel.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the even listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPrevious = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Render only the relevant images based on the current index
  const getRelevantImages = () => {
    if (isMobile) {
      return [images[index]];
    } else {
      const prevIndex = index - 1 < 0 ? images.length - 1 : index - 1;
      const nextIndex = index + 1 >= images.length ? 0 : index + 1;
      return [images[prevIndex], images[index], images[nextIndex]];
    }
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-header">OUR GALLERY</h2>
      <div className="carousel-wrapper">
        {getRelevantImages().map((image, idx) => (
          <img key={idx} src={image} alt={`Slide ${idx}`} className="slide" />
        ))}
        <div className="nav-button left" onClick={goToPrevious}></div>
        <div className="nav-button right" onClick={goToNext}></div>
      </div>
      <div className="carousel-footer">
        <span className="image-counter">{`${index + 1} / ${
          images.length
        }`}</span>
        <button className="footer-nav-button left" onClick={goToPrevious}>
          <FaArrowLeftLong />
        </button>
        <button className="footer-nav-button right" onClick={goToNext}>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
