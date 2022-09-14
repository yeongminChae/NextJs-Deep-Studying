import type { NextPage } from "next";
import { motion } from "framer-motion";

const boxVars = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const circleVars = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      <motion.div
        variants={boxVars}
        initial="start"
        animate="end"
        className="grid h-44 w-44 grid-cols-2 rounded-2xl bg-white/[0.1] shadow-md "
      >
        <motion.div
          variants={circleVars}
          className="h-16 w-16 place-self-center rounded-full bg-white shadow-md"
        />
        <motion.div
          variants={circleVars}
          className="h-16 w-16 place-self-center rounded-full bg-white shadow-md"
        />
        <motion.div
          variants={circleVars}
          className="h-16 w-16 place-self-center rounded-full bg-white shadow-md"
        />
        <motion.div
          variants={circleVars}
          className="h-16 w-16 place-self-center rounded-full bg-white shadow-md"
        />
      </motion.div>
    </div>
  );
};

export default Home;
