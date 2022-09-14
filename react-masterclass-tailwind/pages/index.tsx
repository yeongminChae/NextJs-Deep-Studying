import type { NextPage } from "next";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tl from-purple-500 to-pink-500">
      <div className="h-48 w-48 rounded-lg bg-white shadow-md" />
    </div>
  );
};

export default Home;
