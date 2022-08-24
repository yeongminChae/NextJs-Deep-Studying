import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Loved: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="flex flex-col space-y-5 py-10">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
