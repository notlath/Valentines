import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Approval from "./Approval.jsx";
import "./Valentine.css";
import catGIF from "./assets/cat.gif";

const Valentine = () => {
  const noButtonRef = useRef(null);
  const [position, setPosition] = useState({ top: 20, left: 20 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const noButton = noButtonRef.current;
      if (!noButton) return;

      const x = event.clientX;
      const y = event.clientY;
      const buttonRect = noButton.getBoundingClientRect();

      const distance = Math.hypot(buttonRect.x - x, buttonRect.y - y);

      if (distance < 250 || isAtCorner(buttonRect)) {
        let newTop, newLeft;

        if (isAtCorner(buttonRect)) {
          // If the button is at the corner, move it to a random position
          newTop = Math.random() * (window.innerHeight - buttonRect.height);
          newLeft = Math.random() * (window.innerWidth - buttonRect.width);
        } else {
          // Otherwise, move it away from the cursor
          const angle = Math.atan2(y - buttonRect.y, x - buttonRect.x);
          newTop = position.top + Math.sin(angle) * 400;
          newLeft = position.left + Math.cos(angle) * 270;
        }

        // Ensure the button stays within the window view height
        newTop = Math.min(
          Math.max(newTop, 0),
          window.innerHeight - buttonRect.height
        );
        newLeft = Math.min(
          Math.max(newLeft, 0),
          window.innerWidth - buttonRect.width
        );

        setPosition({
          top: newTop,
          left: newLeft,
        });
      }
    };

    const isAtCorner = (rect) => {
      const tolerance = 10; // pixels
      const isAtLeft = rect.left <= tolerance;
      const isAtRight = rect.right >= window.innerWidth - tolerance;
      const isAtTop = rect.top <= tolerance;
      const isAtBottom = rect.bottom >= window.innerHeight - tolerance;

      return isAtLeft || isAtRight || isAtTop || isAtBottom;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [position]);

  const [showApproval, setShowApproval] = useState(false);

  const handleYesClick = () => {
    setShowApproval(true);
  };

  if (showApproval) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Approval />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="will-you-be-my-valentine">
          <img src={catGIF} alt="cat" />
          <h1>Will you be my Valentine?</h1>
          <p>
            This is a rhetorical question. You have no choice. We are married!
          </p>
          <div className="valentine-button">
            {" "}
            <button
              onClick={handleYesClick}
              className="valentine-button-yes"
              tabIndex="-1"
            >
              Yes
            </button>
            <button
              ref={noButtonRef}
              className="valentine-button-no"
              style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                transition: "top 0.2s, left 0.2s",
              }}
              tabIndex="-1"
            >
              No
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Valentine;
