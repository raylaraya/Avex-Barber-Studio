import React from "react";
import "./about-section.css";
import { Link } from "react-router-dom";

const AboutSection = ({
  title,
  paragraphs,
  imageSrc,
  linkTo,
  linkText,
  additionalImages,
}) => {
  return (
    <div className="about-section">
      <div className="about-container">
        {imageSrc && (
          <img src={imageSrc} alt="Barbershop" className="about-image" />
        )}
        <div className="about-content">
          {title && <h2>{title}</h2>}
          {paragraphs &&
            paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

          {linkTo && linkText && (
            <Link to={linkTo} className="about-button">
              {linkText}
            </Link>
          )}
        </div>
      </div>
      {additionalImages && additionalImages.length > 0 && (
        <div className="additional-images-container">
          {additionalImages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Additional view ${index + 1}`}
              className="about-additional-image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutSection;
