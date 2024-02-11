import React, { useState } from "react";
import "./Card.css";
import Valentine from "./Valentine";
import heartIcon from "./assets/heart.png";

const Card = () => {
  const [showValentine, setShowValentine] = useState(false);

  const handleNextClick = () => {
    setShowValentine(true);
  };

  if (showValentine) {
    return <Valentine />;
  }

  return (
    <div className="codepen-wrapper">
      <div className="book">
        <div className="page">
          <div className="page__1">
            <p>Hover to open</p>
            <img src={heartIcon} alt="Heart" />
          </div>
          <div className="page__2">
            <p>
              As we celebrate our love this Valentine's Day, I want you to know
              how much you mean to me. You are my best friend, my confidant, my
              cheerleader, and the love of my life.
            </p>
            <p>
              Every day with you feels like a gift. Here's to many more
              Valentine's Days together and making even more special memories
              side-by-side. I love you with all my heart, Jermane!
            </p>
            <button className="next-button" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
