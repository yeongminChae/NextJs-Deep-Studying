import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";

const EditPriofile: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            className="cursor-pointer py-2 px-3 
            border border-gray-300 rounded-md shadow-sm font-medium
            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none 
            text-white bg-orange-500 hover:bg-orange-600 text-sm
            "
          >
            Change Photo
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="input"
            type="email"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500  "
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 secelt-none text-sm">
              +82
            </span>
            <input
              id="input"
              type="number"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 "
              required
              placeholder=""
            />
          </div>
        </div>
        <Button text="Update Profile" />
      </div>
    </Layout>
  );
};

export default EditPriofile;
