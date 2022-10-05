import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { getMovies } from "../api";
import Header from "./Components/Header";

const Home: NextPage = () => {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return (
    <div className="h-[200vh] bg-neutral-400 ">
      <Header />
      <div></div>
    </div>
  );
};

export default Home;
// cp -r pages/nomflix ../../portfolio/my-portfolio-app/pages/cloneCoding/
// for copying
