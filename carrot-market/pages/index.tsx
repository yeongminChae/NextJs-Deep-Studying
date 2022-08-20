import type { NextPage } from "next";
import FloatingBtn from "@components/floating-btn";
import Layout from "@components/layout";
import Item from "@components/item";
import useUser from "@libs/cleint/useUser";
import Head from "next/head";
import useSWR from "swr";
import products from "./api/products";
import { Product } from "@prisma/client";

interface ProductResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductResponse>("/api/products");
  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>Hone</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={1}
            props="black"
          />
        ))}
        <FloatingBtn href="/products/upload">
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
