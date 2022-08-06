import type { NextPage } from "next";
import Layout from "../../components/layout";
import Item from "../../components/item";

const Bought: NextPage = () => {
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

export default Bought;
