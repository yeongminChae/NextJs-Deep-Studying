import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="grid gap-10 bg-slate-200 p-20 text-center ">
      <h1 className="text-black">it works</h1>
      <span className="flex flex-col gap-10 bg-red-300">does it?</span>
    </div>
  );
};

export default Home;
