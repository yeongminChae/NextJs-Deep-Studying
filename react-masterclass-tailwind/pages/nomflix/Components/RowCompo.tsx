import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../../../libs/client/utils";
import { getMovies, IGetMoviesResult } from "../../api/movieApi";
import MovieInfo from "./MovieInfo";

export default function RowCompo({}) {
  const router = useRouter();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const onBoxClick = (movieId: number) => {
    router.push(`?movieId=${data}`, `/nomflix/${movieId} `);
  };
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState<boolean>(false);
  const customValue = {
    direction: back,
  };
  const offset = 6;
  return (
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
            <MovieInfo title={movie.title} />
          </Box>
        ))}
    </Row>
  );
}
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgPhoto});
`;
const Row = styled(motion.div)``;

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
