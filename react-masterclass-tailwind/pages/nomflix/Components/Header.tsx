import type { NextPage } from "next";

const Header: NextPage = () => {
  return (
    <div className="font-xs fixed top-0 flex h-20 w-full items-center justify-center bg-[#E51013] ">
      <div>
        <svg className="mr-12" />
        <ul className="flex items-center">
          <li className="mr-5 text-[#fff] transition delay-150 ease-in-out hover:text-[#e5e5e5] ">
            Home
          </li>
          <li className="mr-5 text-[#fff] transition delay-150 ease-in-out hover:text-[#e5e5e5] ">
            tv Show
          </li>
        </ul>
      </div>
      <div>
        <span className="text-white">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Header;
