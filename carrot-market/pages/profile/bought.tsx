import type { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";
import ProductList from "@components/product-list";

const Bought: NextPage = () => {
  return (
    <Layout seoTitle="구매내역" title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 py-10">
        <ProductList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bought;
