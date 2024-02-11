import { motion } from "framer-motion";
import React from "react";
import "./Valentine.css";
import loveGIF from "./assets/love.gif";

const Approval = () => {
  return (
    <motion.div
      className="approval"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="approval__content">
        <img src={loveGIF} alt="Love GIF" />
        <h1>I love you so much!</h1>
        <p>Chat tayo sa Messenger beh mwaps :3 </p>
        <div className="approval__buttons"></div>
      </motion.div>
    </motion.div>
  );
};

export default Approval;
