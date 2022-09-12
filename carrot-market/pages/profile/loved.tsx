import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Loved: NextPage = () => {
  return (
    <Layout seoTitle="관심내역" title="관심내역" canGoBack>
      <div className="flex flex-col space-y-5 divide-y">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
