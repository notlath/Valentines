import React from "react";

const Greetings = ({ text }) => {
  return (
    <h1
      key={text}
      className={text === "Laro muna tayo!" ? "greetings-laro" : "greetings"}
    >
      {text}
    </h1>
  );556
};

export default Greetings;
