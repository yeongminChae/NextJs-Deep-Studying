import type { NextPage } from "next";
import Layout from "../../components/layout";
import Button from "../../components/button";
import TextArea from "../../components/textarea";
import Input from "../../components/input";

const Upload: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10 space-y-5">
        <Input required label="Name" name="name" type="text" />
        <Input
          required
          label="Price"
          name="price"
          type="text"
          kind="price"
          placeholder="0.00"
        />
        <TextArea name="description" label="Description" />
        <Button text="Live Start" />
      </form>
    </Layout>
  );
};

export default Upload;
