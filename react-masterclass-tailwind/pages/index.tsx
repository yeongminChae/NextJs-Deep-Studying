import type { NextPage } from "next";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      {/* <motion.div
        animate={{ borderRadius: "100px" }}
        // transition={{ delay: 3 }}
        transition={{ duration: 3 }}
        className="h-48 w-48 rounded-lg bg-white shadow-md"
       />  basic framer motion  */}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
        // transition={{ type: "tween" }}
        // transition={{ type: "spring" }} // basic type , which is jumping
        transition={{ type: "spring", delay: 0.5 }}
        // transition={{ type: "spring", bounce: 0.5 }} //  more bouncing
        // transition={{ type: "spring", stiffness: 10 }} // make smth stiff
        // transition={{ type: "spring", damping: 10 }} // more jumping
        className="h-48 w-48 rounded-2xl bg-white shadow-md"
      ></motion.div>
    </div>
  );
};

export default Home;
