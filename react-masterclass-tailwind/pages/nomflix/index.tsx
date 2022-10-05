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
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
`;

const rowVars = {
  // hidden: {
  //   // x: windowWidth,
  // },
  visible: {
    x: 0,
  },
  // exit: {
  //   x: -window.outerWidth - 155,
  // },
};

const offset = 6;

const Home: NextPage = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      // index = page
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [leaving, setLeaving] = useState(false);
  return (
    <div className="w-full ">
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
            onClick={increaseIndex}
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
        <Slider className="relative -mt-20">
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Row
              variants={rowVars}
              initial={{
                x: "1440px",
              }}
              animate="visible"
              exit={{
                x: "-1440px",
              }}
              key={index}
              transition={{ type: "tween", duration: 1 }}
              className="absolute mb-1 grid w-full grid-cols-6 gap-2"
            >
              {data?.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <Box
                    className="h-52 bg-white bg-cover bg-[center_center] text-3xl text-red-500 "
                    key={movie.id}
                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    {/* {movie.title}{" "} */}
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
