import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cls } from "../libs/client/utils";

const Home: NextPage = () => {
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked((prev) => !prev);
  return (
    <motion.div
      onClick={toggle}
      className="flex h-screen w-screen items-center justify-around bg-gradient-to-r from-[#c407d1] to-[#e09]"
    >
      <motion.div className="box-child grid w-[50vw] grid-cols-3 gap-3.5">
        <motion.div
          layoutId="Hello"
          className="col-span-2 h-40 rounded-[40px] bg-white text-2xl shadow-xl"
        />
        <motion.div className="h-40 rounded-[40px] bg-white text-2xl shadow-xl" />
        <motion.div className="h-40 rounded-[40px] bg-white text-2xl shadow-xl" />
        <motion.div className="col-span-2 h-40 rounded-[40px] bg-white text-2xl shadow-xl" />
      </motion.div>
      <AnimatePresence>
        {clicked ? (
          <motion.div
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            className="absolute flex h-[100%] w-[100%] items-center justify-center "
          >
            <motion.div
              layoutId="Hello"
              className="h-[200px] w-[350px] rounded-[40px] bg-white text-2xl shadow-xl"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
