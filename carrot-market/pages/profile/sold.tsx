import type { NextPage } from "next";
import Item from "../../components/item";
import Layout from "../../components/layout";

const Sold: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="flex flex-col space-y-5 py-10">
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
      </div>
    </Layout>
  );
};

export default Sold;
