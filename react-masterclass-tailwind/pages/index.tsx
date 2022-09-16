import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const box = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
    rotateX: 180,
    transition: {
      duration: 1,
    },
  },
};

const Home: NextPage = () => {
  const [visible, setVisible] = useState(1);
  const nextPls = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  return (
    <motion.div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
          i === visible ? (
            <motion.div
              key={i}
              variants={box}
              initial="invisible"
              animate="visible"
              exit="exit"
              className="absolute flex h-40 w-40 items-center justify-center rounded-[40px] bg-white text-2xl shadow-xl"
            >
              {i}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
      <button className="absolute bottom-52" onClick={nextPls}>
        Next
      </button>
    </motion.div>
  );
};

export default Home;
