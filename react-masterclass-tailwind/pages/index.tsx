import type { NextPage } from "next";
import { motion } from "framer-motion";

const boxVars = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: {
    backgroundColor: "rgb(191, 172, 224)", // if i put rgb(int) then motion will adapte animatiion automatically
    transition: {
      duration: 3,
    },
  },
};

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      <motion.div
        variants={boxVars}
        drag
        whileDrag="drag"
        whileHover="hover"
        whileTap="click"
        className="grid h-44 w-44 grid-cols-2 rounded-2xl bg-white shadow-md "
      ></motion.div>
    </div>
  );
};

export default Home;
