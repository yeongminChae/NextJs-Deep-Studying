import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";

const Live: NextPage = () => {
  return (
    <Layout hasTabBar title="Live Streaming">
      <div className="py-10 space-y-4 divide-y-2 ">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="pt-4 px-4">
            <Link href="/streams/$`[id]` ">
              <div className="w-full bg-slate-300 cursor-pointer aspect-video rounded-md shadow-sm  " />
            </Link>
            <Link href="/streams/$`[id]` ">
              <h3 className="text-gray-700 text-2xl mt-2 font-bold cursor-pointer ">
                Galaxy S50
              </h3>
            </Link>
          </div>
        ))}
        <Link href="/streams/create">
          <button className="fixed cursor-pointer hover:bg-orange-400 transition-colors  bottom-24 right-5 bg-orange-500 rounded-full p-4 text-white shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Live;
