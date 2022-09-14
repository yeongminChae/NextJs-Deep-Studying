import type { NextPage } from "next";
import { motion } from "framer-motion";

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } },
};

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      <motion.div
        variants={myVars}
        initial="start"
        animate="end"
        className="h-48 w-48 rounded-2xl bg-white shadow-md"
      ></motion.div>
    </div>
  );
};

export default Home;
