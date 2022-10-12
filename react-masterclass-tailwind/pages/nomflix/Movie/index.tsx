import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import {
  getNowPalyingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
} from "../../api/movieApi";
import Header from "../Components/Header";
import { makeImagePath } from "../../../libs/client/utils";
import MovieInfo from "../Components/movieComponent/MovieInfo/MovieInfo";
import SliderTopRated from "../Components/movieComponent/Slider/SliderTopRated";
import SliderPopular from "../Components/movieComponent/Slider/SliderPopular";
import SliderUpcoming from "../Components/movieComponent/Slider/SliderUpcoming";
import SliderNowPlaying from "../Components/movieComponent/Slider/SliderNowPlaying";

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Movie: NextPage = () => {
  const { data: nowPlayingData, isLoading: nowPlayingIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowPalyingMovies);
  const { data: popularData, isLoading: latestIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "Latest"], getPopularMovies);
  const { data: top_ratedData, isLoading: top_ratedIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "TopRated"], getTopRatedMovies);
  const { data: UpcomingData, isLoading: UpcomingIsLoading } =
    useQuery<IGetMoviesResult>(["movies", "Upcoming"], getUpcomingMovies);
  const isLoading =
    nowPlayingIsLoading &&
    latestIsLoading &&
    top_ratedIsLoading &&
    UpcomingIsLoading;
  return (
    <div className="absolute overflow-hidden ">
      <Header />
      <div id="wraper" className=" h-[245vh] w-full overflow-x-hidden bg-black">
        {isLoading ? (
          <div
            id="loader"
            className="flex h-[20vh] items-center justify-center  "
          >
            LOADING...{" "}
          </div>
        ) : (
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
            className="flex h-[100vh] w-full flex-col justify-center bg-cover p-10 "
          >
            <div id="title" className="mb-4 text-4xl text-white">
              {" "}
              {nowPlayingData?.results[0].title}{" "}
            </div>
            <div id="overview" className="w-1/2 text-base text-white ">
              {nowPlayingData?.results[0].overview}{" "}
            </div>
          </Banner>
        )}{" "}
        <div className="">
          <SliderTopRated SliderTitle="Top Rated Movies" />
        </div>
        <div className="my-[300px] ">
          <SliderNowPlaying SliderTitle="Now Palying Movies" />
        </div>
        <div className="my-[300px] ">
          <SliderPopular SliderTitle="Popular Movies" />
        </div>
        <div className="my-[300px] ">
          <SliderUpcoming SliderTitle="Upcoming Movies" />
        </div>
        <MovieInfo />
      </div>
    </div>
  );
};

export default Movie;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
