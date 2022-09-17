import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cls } from "../libs/client/utils";
import styled from "styled-components";

const Grid = styled.div`
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Home: NextPage = () => {
  const [clickedId, setClickedId] = useState<null | string>(null);
  return (
    <motion.div className="flex h-screen w-screen items-center justify-around bg-gradient-to-r from-[#c407d1] to-[#e09]">
      <Grid className="grid w-[50vw] grid-cols-3 gap-3.5 ">
        {["1", "2", "3", "4"].map((n) => (
          <motion.div
            onClick={() => setClickedId(n)}
            key={n}
            layoutId={n} // cf) int + "" -> string
            className="h-40 rounded-[40px] bg-white text-2xl shadow-xl"
          />
        ))}
      </Grid>
      <AnimatePresence>
        {clickedId ? (
          <motion.div
            onClick={() => setClickedId(null)}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            className="absolute flex h-[100%] w-[100%] items-center justify-center "
          >
            <motion.div
              layoutId={clickedId}
              className="h-[200px] w-[350px] rounded-[40px] bg-white text-2xl shadow-xl"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
