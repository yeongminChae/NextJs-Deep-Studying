import type { NextPage } from "next";
import { useRouter } from "next/router";
import Header from "../Components/Header";

const Search: NextPage = () => {
  const router = useRouter();
  const routerQuery = router.query;
  const routekeyword = routerQuery.keyword;
  const routeRegion = routerQuery.region;
  return (
    <div className="relative">
      <Header />
      <div className="h-[200vh] w-full bg-neutral-400 pt-20 ">
        <div className="">{routekeyword}</div>
        <div className="">{routeRegion}</div>
      </div>
    </div>
  );
};

export default Search;
