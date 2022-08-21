import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/cleint/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation("/api/posts");
  const onValid = (data: WriteForm) => {
    if (loading) return; // it's for preventing when users click the button too many times
    post(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id} `);
    }
  }, [data, router]);
  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="Answer this question!"
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
