import type { NextPage } from "next";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const Home: NextPage = () => {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  useEffect(() => {
    // x.onChange(()=>console.log(x.get()))
    scale.onChange(() => console.log(scale.get()));
  }, [x, scale]);
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600">
      <motion.div
        drag="x"
        dragSnapToOrigin
        style={{ x, scale: scale }}
        className="grid h-32 w-32 grid-cols-2 rounded-2xl bg-white shadow-md "
      />
    </div>
  );
};

export default Home;
