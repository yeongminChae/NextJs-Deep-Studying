import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { makeImagePath } from "../../../libs/client/utils";
import Header from "../Components/Header";
import { MovieSearch } from "../Components/MovieSearch";

const Search = () => {
  const router = useRouter();
  const keyword = router.asPath.split("/")[2].split("=")[2];
  // const keyword = router.asPath.split("/")[2].split("&")[0].split("=")[1];
  const [cat, setCat] = useState("movies" || "Tvs");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const onBoxClicked = ({ movieId }: { movieId: number }) => {
    router.push(`/search/${movieId}?category=movies&keyword=${keyword}`);
  };
  // console.log(keyword);
  return (
    mounted && (
      <div className="relative overflow-hidden ">
        <Header />
        <div
          id="wraper"
          className="flex h-[245vh] w-full flex-col overflow-x-hidden bg-black "
        >
          {/* <div>
            <div
              onClick={() => {
                setCat(true);
                // srcParams.set("category", "movies");
                // navigate(`/search/?${srcParams.toString()}`);
              }}
            >
              <motion.svg
                variants={btnVariants}
                initial="start"
                animate="end"
                custom={{ category: cat }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M326.1 160l127.4-127.4C451.7 32.39 449.9 32 448 32h-86.06l-128 128H326.1zM166.1 160l128-128H201.9l-128 128H166.1zM497.7 56.19L393.9 160H512V96C512 80.87 506.5 67.15 497.7 56.19zM134.1 32H64C28.65 32 0 60.65 0 96v64h6.062L134.1 32zM0 416c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V192H0V416z" />
              </motion.svg>
              <motion.span
                variants={btnTextVariants}
                initial="start"
                animate="end"
                custom={{ category: cat }}
              >
                MOVIES
              </motion.span>
            </div>
            <CatButton
              onClick={() => {
                setCat(false);
                // srcParams.set("category", "tvs");
                // navigate(`/search/?${srcParams.toString()}`);
              }}
            >
              <motion.svg
                variants={btnVariants}
                initial="start"
                animate="end"
                custom={{ category: !cat }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="currentColor"
              >
                <path d="M512 448H127.1C110.3 448 96 462.3 96 479.1S110.3 512 127.1 512h384C529.7 512 544 497.7 544 480S529.7 448 512 448zM592 0h-544C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h544c26.5 0 48-21.5 48-48v-320C640 21.5 618.5 0 592 0zM576 352H64v-288h512V352z" />
              </motion.svg>
              <motion.span
                variants={btnTextVariants}
                initial="start"
                animate="end"
                custom={{ category: !cat }}
              >
                TV SHOW
              </motion.span>
            </CatButton>
          </div> */}
          <Keyword className="mt-20 ml-10 text-lg text-red-400">
            Are You Searching : {keyword} ?
          </Keyword>
          {/* @ts-ignore */}
          <MovieSearch keyword={keyword} />
          {/* {cat ? (
          <MoviesSearchResults keyword={keyword} />
        ) : (
          <>
            <TvsSearchResults keyword={keyword} />
          </>
        )
        } */}
        </div>
      </div>
    )
  );
};

const Btns = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 120px; */
`;

const CatButton = styled(motion.div)`
  /* color: rgb(255, 255, 255);
  cursor: pointer;
  margin: 0px 60px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center; */
`;

const Keyword = styled.h1`
  /* margin: 50px 0px;
  font-size: 36px;
  font-weight: 600; */
`;

const btnVariants = {
  start: {
    width: "60px",
    height: "60px",
  },
  end: ({ category }: { category: boolean }) => ({
    width: category ? "120px" : "60px",
    height: category ? "120px" : "60px",
    transition: {
      duration: 0.4,
      type: "tween",
    },
    opacity: category ? 1 : 0.3,
  }),
};

const btnTextVariants = {
  start: {
    fontSize: "8px",
  },
  end: ({ category }: { category: boolean }) => ({
    fontSize: category ? "16px" : "8px",
    fontWeight: category ? 600 : 300,
    transition: {
      duration: 0.4,
      type: "tween",
    },
    opacity: category ? 1 : 0.3,
  }),
};

export default Search;
