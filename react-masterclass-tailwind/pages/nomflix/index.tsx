import type { NextPage } from "next";
import Header from "./Components/Header";

const Home: NextPage = () => {
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
