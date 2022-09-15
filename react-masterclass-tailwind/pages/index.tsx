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
      "linear-gradient(135deg,rgb(160, 132, 202),rgb(235, 199, 232))",
      "linear-gradient(135deg,rgb(247, 246, 220),rgb(255, 192, 144))",
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
        className="bg-white[/0.2] grid h-32 w-32 grid-cols-2 rounded-2xl border-2 border-double border-white shadow-md  "
      />
    </motion.div>
  );
};

export default Home;
