import type { NextPage } from "next";
import FloatingBtn from "@components/floating-btn";
import Layout from "@components/layout";
import Item from "@components/item";
import useUser from "@libs/cleint/useUser";
import Head from "next/head";
import useSWR, { SWRConfig } from "swr";
import { Product, User } from "@prisma/client";
import client from "@libs/server/client";
import Image from "next/image";
export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductResponse>("/api/products");
  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y">
        {data
          ? data?.products?.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                title={product.name}
                price={product.price}
                hearts={product._count?.favs || 0}
                image={product.image}
              />
            ))
          : "Loading..."}
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
        {/*  placeholder="blur" quality={5} /> */}
      </div>
    </Layout>
  );
};

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const products = await client.product.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;
