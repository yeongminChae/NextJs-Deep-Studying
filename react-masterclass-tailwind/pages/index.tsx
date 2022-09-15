import type { NextPage } from "next";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect } from "react";

const Home: NextPage = () => {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg,rgb(0, 238, 214),rgb(18, 70, 240))",
      "linear-gradient(135deg,rgb(238,0,153),rgb(221,0,238))",
      "linear-gradient(135deg,rgb(34, 237, 44),rgb(173, 170, 27))",
    ]
  );
  const { scrollY, scrollYProgress } = useScroll();
  // useEffect(() => {
  //   scrollY.onChange(() => {
  //     console.log(scrollY.get(), scrollYProgress.get());
  //   });
  // }, [scrollY, scrollYProgress]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  return (
    <motion.div
      style={{ background: gradient }}
      className="flex h-[200vh] w-screen items-center justify-center bg-gradient-to-tl from-purple-600 to-pink-600"
    >
      <motion.div
        drag="x"
        dragSnapToOrigin
        style={{ x, rotateZ, scale }}
        className="grid h-32 w-32 grid-cols-2 rounded-2xl bg-white shadow-md "
      />
    </motion.div>
  );
};

export default Home;
