import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Approval from "./Approval.jsx";
import Card from "./Card";
import "./Card.css";
import Greetings from "./Greetings.jsx";
import Valentine from "./Valentine.jsx";

function App() {
  const greetings = [
    "Hi there!",
    "I was wondering if you have a minute?",
    "I know you're probably busy..",
    "but I wanted to tell you something",
    "Just for a moment, if that's okay.",
  ];
  const [index, setIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [showValentine, setShowValentine] = useState(false);
  const [showApproval, setShowApproval] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex === greetings.length) {
          clearInterval(interval);
          setShowCard(true);
        }
        return nextIndex;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [greetings.length]);

  return (
    <div className="App">
      <Greetings text={greetings[index]} />
      <AnimatePresence mode="wait">
        {showCard && !showValentine && (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Router>
              <Card setShowValentine={setShowValentine} />
            </Router>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showValentine && (
          <motion.div
            key="valentine"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Valentine key="valentine" setShowApproval={setShowApproval} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showApproval && (
          <motion.div
            key="approval"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Approval key="approval" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
