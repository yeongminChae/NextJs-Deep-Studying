import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useRef } from "react";

const boxVars = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: {
    backgroundColor: "rgb(191, 172, 224)",
    transition: {
      duration: 3,
    },
  },
};

const Home: NextPage = () => {
  const biggerBoxref = useRef<HTMLDivElement>(null);
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      <motion.div
        ref={biggerBoxref}
        className="flex h-96 w-96 items-center justify-center  rounded-2xl bg-white/[0.2] "
      >
        <motion.div
          variants={boxVars}
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={biggerBoxref}
          whileDrag="drag"
          whileHover="hover"
          whileTap="click"
          className="grid h-32 w-32 grid-cols-2 rounded-2xl bg-white shadow-md "
        />
      </motion.div>
    </div>
  );
};

export default Home;
