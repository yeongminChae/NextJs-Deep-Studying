import { Query, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import { cls, makeImagePath } from "../../libs/client/utils";
import { getMovies, IGetMoviesResult } from "../api/movieApi";
import Header from "./Components/Header";
import {
  motion,
  AnimatePresence,
  useScroll,
  useAnimation,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { appendFile } from "fs/promises";

Modal.setAppElement("#__next");

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

const dirVars = {
  initial: {
    opacity: 1,
  },
};

const offset = 6;

const Home: NextPage = () => {
  const router = useRouter();
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
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const customValue = {
    direction: back,
  };
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClick = (movieId: number) => {
    router.push(`?movieId=${data}`, `/nomflix/${movieId} `);
  };

  const abc: any = [];
  {
    data?.results.map((movie) => {
      if (router.asPath === `/nomflix/${movie.id}`) {
        abc.push(movie.id);
      }
    });
  }

  return (
    <div className="absolute overflow-hidden ">
      <Header />
      <div id="wraper" className=" h-[200vh] w-full overflow-x-hidden bg-black">
        {isLoading ? (
          <div
            id="loader"
            className="flex h-[20vh] items-center justify-center  "
          >
            LOADING...{" "}
          </div>
        ) : (
          <Banner
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            className="flex h-[100vh] w-full flex-col justify-center bg-cover p-10 "
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
        <Slider className="z-0 -mt-20">
          <AnimatePresence
            initial={false}
            onExitComplete={toggleLeaving}
            mode="sync"
            custom={customValue.direction}
          >
            <Row
              variants={rowVars}
              initial="hidden"
              animate="visible"
              custom={customValue.direction}
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
                    className="h-40 cursor-pointer bg-white bg-cover bg-[center_center] text-3xl 
                    text-red-500 first:origin-[center_left] last:origin-[center_right]"
                    key={movie.id}
                    layoutId={movie.id + ""}
                    onClick={() => onBoxClick(movie.id)}
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
          <div>
            <motion.div
              variants={dirVars}
              initial="initial"
              whileHover={{ scale: 1.4 }}
              onClick={increaseIndex}
              className="relative float-right flex h-40 w-[2.6vw] items-center justify-center bg-transparent text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </motion.div>
            <motion.div
              variants={dirVars}
              initial="initial"
              whileHover={{ scale: 1.4 }}
              onClick={decreaseIndex}
              className="relative float-left flex h-40 w-[2.6vw] items-center justify-center bg-transparent text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </motion.div>
          </div>
        </Slider>
        <AnimatePresence>
          {router.asPath === `/nomflix/${abc[0]}` ? (
            <motion.div
              layoutId={abc[0] + ""}
              className="absolute top-24 left-0 right-0 z-[100] m-auto h-[80vh] w-[40vw] bg-black shadow-xl outline-none "
            />
          ) : null}
          {/* <Modal
              isOpen={!!router.query.movieId}
              closeTimeoutMS={2000}
              onRequestClose={() => router.push("/nomflix")}
              className="absolute top-24 left-0 right-0 z-[100] m-auto h-[80vh] w-[40vw] bg-black shadow-xl outline-none "
            >
              <motion.div className="text-white ">in the modal </motion.div>
            </Modal> */}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
