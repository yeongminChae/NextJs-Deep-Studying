import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-5">
      <details className="select-none open:text-white open:bg-indigo-400 ">
        <summary className=" cursor-pointer">What is my fav food?</summary>
        <span>kimchi</span>
      </details>

      <ul className="list-decimal marker:text-teal-500">
        <li>Hi</li>
        <li>Hi</li>
        <li>Hi</li>
      </ul>

      <input
        type="file"
        className="file:hover:text-purple-400 file:hover:bg-white file:hover:border-purple-400 
        file:transition-colors file:cursor-pointer file:hover:border file:border-0 
        file:rounded-xl file:px-5 file:text-white file:bg-purple-400 "
      />

      <p className="first-letter:text-7xl first-letter:hover:text-purple-400  ">
        make something happened
      </p>
    </div>
  );
};

export default Home;
