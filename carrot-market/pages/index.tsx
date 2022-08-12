import type { NextPage } from "next";
import FloatingBtn from "../components/floating-btn";
import Layout from "../components/layout";
import Item from "../components/item";
// import "../libs/client" -> my backend db should not allow to access in front-end

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {[...Array(10)].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="iPhone 14"
            price={99}
            comments={i}
            hearts={i}
            props="black"
          />
        ))}
        <FloatingBtn href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingBtn>
      </div>
    </Layout>
  );
};
export default Home;
