import type { NextPage } from "next";
import Layout from "../../components/layout";

const Upload: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10 space-y-5">
        <div>
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <div className="rounded-md shadow-sm flex items-center relative ">
            <input
              id="name"
              type="email"
              required
              className="appearance-none w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500  "
            ></input>
          </div>
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="price"
          >
            Price
          </label>
          <div className="rounded-md shadow-sm flex items-center relative ">
            <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none  ">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="appearance-none w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500  "
            />
            <div className="absolute right-0 pr-3 flex items-center pointer-events-none ">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div>
            <textarea
              className="mt-1 shadow-sm w-full focus:ring-1 focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
              rows={4}
              id="description"
            />
          </div>
        </div>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
          Live Start
        </button>
      </div>
    </Layout>
  );
};

export default Upload;
