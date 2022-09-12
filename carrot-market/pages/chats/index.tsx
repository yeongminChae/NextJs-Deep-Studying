import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";

const Chats: NextPage = () => {
  return (
    <Layout seoTitle="Chatting" hasTabBar title="Chatting">
      <Link href="/chats/$`[id]`">
        <div className="py-10 divide-y-[1px]">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="py-3 px-4 mb-3 cursor-pointer flex items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="font-medium text-gray-700">Steve Jebs</p>
                <p className="text-sm font-medium text-gray-500">
                  See u tomorrow in the corner at 2pm
                </p>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </Layout>
  );
};

export default Chats;
