import { useQuery } from "@tanstack/react-query";
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
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import SliderAni from "./Components/SliderAni";
import MovieInfo from "./Components/MovieInfo";

Modal.setAppElement("#__next");

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Home: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <div className="relative overflow-hidden ">
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
        <SliderAni />
        <MovieInfo />
      </div>
    </div>
  );
};

export default Home;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
