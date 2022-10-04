import type { NextPage } from "next";
import { motion, useAnimation, useScroll } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cls } from "../../../libs/client/utils";

const logoVars = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const Header: NextPage = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  const navVars = {
    top: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    scroll: {
      backgroundColor: "rgba(0,0,0,1)",
    },
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [navAnimation, scrollY]);
  return (
    <motion.div
      id="nav"
      variants={navVars}
      animate={navAnimation}
      // other way : animate={{backgroundColor:scrollY > 80 "rgba(0,0,0,0)" : "rgba(0,0,0,1)"}}
      initial="top"
      className={cls(
        "font-xs fixed top-0 flex h-20 w-full items-center justify-between px-5 py-8 ",
        scrollY.get() > 80 ? "shadow-2xl" : "shadow-none"
      )}
    >
      <div id="col" className="flex items-center">
        <div id="logo" className="mr-12 ">
          <motion.svg
            variants={logoVars}
            initial="normal"
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 276.742"
            fill="#E51013"
            className="h-6 w-24"
          >
            {" "}
            <motion.path
              stroke="white"
              strokeWidth={3}
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            />{" "}
          </motion.svg>
        </div>
        <ul id="items" className="flex items-center">
          <li
            id="item"
            className="relative mr-5 flex flex-col items-center justify-center text-[#fff] transition delay-150 ease-in-out hover:text-[#e5e5e5] "
          >
            <Link href="/nomflix">Home</Link>
            {router.pathname == "/nomflix" && (
              <motion.span
                layoutId="circle"
                className="absolute bottom-[-15px] my-auto mx-0 h-2 w-2 rounded-full bg-[#E51013] "
              />
            )}
          </li>
          <li
            id="item"
            className="relative mr-5 flex flex-col items-center justify-center text-[#fff] transition delay-150 ease-in-out hover:text-[#e5e5e5] "
          >
            <Link href="/nomflix/Tv">tv Show</Link>
            {router.pathname == "/nomflix/Tv" && (
              <motion.span
                layoutId="circle"
                className="absolute bottom-[-15px] my-auto mx-0 h-2 w-2 rounded-full bg-[#E51013] "
              />
            )}
          </li>
        </ul>
      </div>
      <div id="col" className="flex items-start justify-between ">
        <span id="search" className="relative flex items-center text-white ">
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -180 : 0 }}
            transition={{ type: "linear" }}
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
          </motion.svg>
          <motion.input
            animate={inputAnimation}
            transition={{ type: "linear" }}
            id="Input"
            placeholder=" Search for ?"
            className="white absolute -left-48 right-0 -z-[1] ml-2 flex origin-right items-center border border-[#fff] bg-transparent px-1 py-2 pl-8 text-base text-white/70"
          />
        </span>
      </div>
    </motion.div>
  );
};

export default Header;
