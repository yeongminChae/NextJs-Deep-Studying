import type { NextPage } from "next";
import { useRouter } from "next/router";
import Header from "./Components/Header";

const MovieDetail: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Header />
    </div>
  );
};
// <motion.div  />
export default MovieDetail;
