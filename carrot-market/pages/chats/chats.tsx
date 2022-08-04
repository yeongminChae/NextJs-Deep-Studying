import type { NextPage } from "next";

const Chats: NextPage = () => {
  return (
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
  );
};

export default Chats;
