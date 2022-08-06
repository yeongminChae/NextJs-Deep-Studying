import type { NextPage } from "next";
import Layout from "../../components/layout";
import Button from "../../components/button";
import TextArea from "../../components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10">
        <TextArea required placeholder="Answer this question!" />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
