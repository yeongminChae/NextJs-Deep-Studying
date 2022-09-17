import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cls } from "../libs/client/utils";

const Home: NextPage = () => {
  const [clicked, setClicked] = useState(false);
  const toggleClick = () => setClicked((prev) => !prev);
  return (
    <motion.div
      onClick={toggleClick}
      className="flex h-screen w-screen items-center justify-around bg-gradient-to-tl from-purple-600 to-pink-600"
    >
      <motion.div className="flex h-64 w-64 items-center justify-center rounded-[40px] bg-white text-2xl shadow-xl">
        {!clicked ? (
          <motion.div
            layoutId="circle"
            className="h-[80px] w-[80px] rounded-full bg-[rgb(0,165,255)] shadow-xl"
          />
        ) : null}
      </motion.div>
      <motion.div className="flex h-64 w-64 items-center justify-center rounded-[40px] bg-white text-2xl shadow-xl">
        {clicked ? (
          <motion.div
            layoutId="circle"
            className="h-[80px] w-[80px] rounded-md bg-[rgb(0,165,255)] shadow-xl"
            style={{ scale: 2 }}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
};

export default Home;
