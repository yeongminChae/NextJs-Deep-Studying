import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import { makeImagePath } from "../../libs/client/utils";
import { getMovies, IGetMoviesResult } from "../api";
import Header from "./Components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;
const Slider = styled.div``;
const Row = styled(motion.div)``;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
`;
const Info = styled(motion.div)``;

const rowVars = {
  hidden: (isBack: boolean) => ({
    x: isBack ? "-1440px" : "1440px",
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? "1440px" : "-1440px",
  }),
};

const boxVars = {
  normal: {
    scale: 1,
    transition: {
      type: "tween",
    },
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const nextVars = {
  initial: {
    opacity: 1,
  },
};
const offset = 6;

const Home: NextPage = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState<boolean>(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1; // index = page
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };
  const customValue = {
    direction: back,
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [leaving, setLeaving] = useState(false);
  return (
    <div className="w-full overflow-x-hidden ">
      <Header />
      <div id="wraper" className="h-[200vh] bg-black  ">
        {isLoading ? (
          <div
            id="loader"
            className="flex h-[20vh] items-center justify-center  "
          >
            LOADING...{" "}
          </div>
        ) : (
          <Banner
            bgPhoto={makeImagePath(data?.results[17].backdrop_path || "")}
            className="flex h-[100vh] flex-col justify-center bg-cover p-10 "
          >
            <div id="title" className="mb-4 text-4xl text-white">
              {" "}
              {data?.results[0].title}{" "}
            </div>
            <div id="overview" className="w-1/2 text-base text-white ">
              {data?.results[0].overview}{" "}
            </div>
          </Banner>
        )}{" "}
        <Slider className="relative -mt-20 ">
          <AnimatePresence
            initial={false}
            onExitComplete={toggleLeaving}
            mode="sync"
            custom={customValue.direction}
          >
            <div>
              <motion.div
                variants={nextVars}
                initial="initial"
                whileHover={{ scale: 1.4 }}
                onClick={increaseIndex}
                className="relative float-right flex h-40 w-[2.6vw] items-center justify-center bg-transparent text-white"
              >
                to next
              </motion.div>
              <motion.div
                variants={nextVars}
                initial="initial"
                whileHover={{ scale: 1.4 }}
                onClick={decreaseIndex}
                className="relative float-left flex h-40 w-[2.6vw] items-center justify-center bg-transparent text-white"
              >
                to prev
              </motion.div>
            </div>
            <Row
              variants={rowVars}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={index}
              transition={{ type: "tween", duration: 1 }}
              className="absolute mx-10 mb-1 grid w-[93.5vw] grid-cols-6 gap-2"
            >
              {data?.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <Box
                    className="h-40 bg-white bg-cover bg-[center_center] text-3xl text-red-500 
                    first:origin-[center_left] last:origin-[center_right]"
                    key={movie.id}
                    variants={boxVars}
                    initial="normal"
                    whileHover="hover"
                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    <Info
                      variants={infoVars}
                      className="absolute bottom-0 w-full bg-black/60 p-3 opacity-0"
                    >
                      <div className="text-center text-lg text-white">
                        {movie.title}
                      </div>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </Slider>
      </div>
    </div>
  );
};

export default Home;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
