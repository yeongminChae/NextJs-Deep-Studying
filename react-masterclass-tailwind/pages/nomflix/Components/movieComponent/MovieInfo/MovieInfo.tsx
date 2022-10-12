import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";
import { makeImagePath } from "../../../../../libs/client/utils";
import {
  getNowPalyingMovies,
  IGetMoviesResult,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../../../api/movieApi";

export default function MovieInfo() {
  const router = useRouter();
  const { scrollY } = useScroll();
  // const { data:nowPlayingData, isLoading:isnowPlayingLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "nowPlaying"],
  //   getNowPalyingMovies
  // );
  // const { data:LatestData, isLoading:isLatestLoading } = useQuery<IGetMoviesResult>(
  //   ["movies", "Latest"],
  //   getLatestMovies
  // );
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPalyingMovies
  );
  const moId: any = [];
  const moTitile: any = [];
  const moImg: any = [];
  const moOverview: any = [];
  {
    data?.results.map((movie) => {
      if (router.asPath === `/nomflix/${movie.id}`) {
        moId.push(movie.id);
        moTitile.push(movie.title);
        moImg.push(movie.backdrop_path);
        moOverview.push(movie.overview);
      }
    });
  }
  const onOverlayClick = () => router.back();
  return (
    <div>
      <AnimatePresence>
        {router.asPath === `/nomflix/${moId[0]}` ? (
          <div className="relative">
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 h-full w-full bg-[rgba(0,0,0,0.5)] opacity-0 "
            >
              <Bigmovie
                layoutId={moId[0] + ""}
                className="absolute left-0 right-0 z-[100] mx-auto h-[90vh] w-[40vw] overflow-hidden rounded-lg bg-[#2F2F2F] shadow-xl outline-none "
                scrollY={scrollY.get()}
              >
                <>
                  <BigCover
                    bgPhoto={makeImagePath(moImg, "w500")}
                    className="h-[350px] w-full bg-cover bg-[center_center] "
                  />
                  <BigTitle className="relative top-[-80px] p-5 text-lg text-[#fff]">
                    {moTitile}{" "}
                  </BigTitle>
                  <BigOverview className="relative top-[-80px] p-5 text-[#fff] ">
                    {moOverview}{" "}
                  </BigOverview>
                </>
              </Bigmovie>
            </Overlay>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const Overlay = styled(motion.div)``;
const Bigmovie = styled(motion.div)<{ scrollY: number }>`
  top: ${(props) => props.scrollY + 100}px;
`;
const BigCover = styled(motion.div)<{ bgPhoto?: string }>`
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.bgPhoto});
`;
const BigTitle = styled(motion.div)``;
const BigOverview = styled(motion.div)``;
