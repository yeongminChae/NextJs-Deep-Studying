import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import { makeImagePath } from "../../libs/client/utils";
import { getMovies, IGetMoviesResult } from "../api";
import Header from "./Components/Header";

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Home: NextPage = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(data, isLoading);
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
            bgPhoto={makeImagePath(data?.results[5].backdrop_path || "")}
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
        {/* ) : <></> }{" "} return Fragment : for returning many elements to next each other without single common parent*/}
      </div>
    </div>
  );
};

export default Home;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
