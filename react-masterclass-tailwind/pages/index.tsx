import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const boxVars = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

const Home: NextPage = () => {
  const [showing, setShowing] = useState(false);
  const toggleShowng = () => setShowing((prev) => !prev);
  return (
    <motion.div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      <button onClick={toggleShowng}>Click</button>
      <AnimatePresence>
        {showing ? (
          <motion.div
            variants={boxVars}
            initial="initial"
            animate="visible"
            exit="leaving"
            className="absolute top-[100px] h-48 w-[400px] rounded-3xl bg-white shadow-lg "
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
