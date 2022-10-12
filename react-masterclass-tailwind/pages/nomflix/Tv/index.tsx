import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import styled from "styled-components";
import { makeImagePath } from "../../../libs/client/utils";
import Header from "../Components/Header";
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  IGetTvResult,
} from "../../api/tvApi";
import SliderAiringToday from "../Components/tvComponent/Slider/SliderAiringToday";
import SliderOnTheAir from "../Components/tvComponent/Slider/SliderOnTheAir";
import SliderPopularTv from "../Components/tvComponent/Slider/SliderPopularTv";
import SliderTopRatedTv from "../Components/tvComponent/Slider/SliderTopRatedTv";

const Banner = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
`;

const Tv: NextPage = () => {
  const { data: AiringTodayData, isLoading: AiringTodayIsLoading } =
    useQuery<IGetTvResult>(["tvs", "AiringToday"], getAiringTodayTv);
  const { data: popularTvData, isLoading: popularTvIsLoading } =
    useQuery<IGetTvResult>(["tvs", "popularTv"], getPopularTv);
  const { data: top_ratedTvData, isLoading: top_ratedTvIsLoading } =
    useQuery<IGetTvResult>(["tvs", "TopRatedTv"], getTopRatedTv);
  const { data: OnTheAirData, isLoading: OnTheAirIsLoading } =
    useQuery<IGetTvResult>(["tvs", "OnTheAir"], getOnTheAirTv);
  const isLoading =
    AiringTodayIsLoading &&
    popularTvIsLoading &&
    top_ratedTvIsLoading &&
    OnTheAirIsLoading;
  return (
    <div className="relative overflow-hidden ">
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
              top_ratedTvData?.results[1].backdrop_path || ""
            )}
            className="flex h-[100vh] w-full flex-col justify-center bg-cover p-10 "
          >
            <div id="title" className="mb-4 text-4xl text-white">
              {top_ratedTvData?.results[1].name}{" "}
            </div>
            <div id="overview" className="w-1/2 text-base text-white ">
              {top_ratedTvData?.results[1].overview}{" "}
            </div>
          </Banner>
        )}
        <div className="">
          <SliderAiringToday SliderTitle="Airing Today Series " />
        </div>
        <div className="my-[300px] ">
          <SliderOnTheAir SliderTitle="On The Air Series" />{" "}
        </div>
        <div className="my-[300px] ">
          <SliderPopularTv SliderTitle="Popular Tv Series" />
        </div>
        <div className="my-[300px] ">
          <SliderTopRatedTv SliderTitle="Top Rated Tv Series" />{" "}
        </div>
      </div>
    </div>
  );
};

export default Tv;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
