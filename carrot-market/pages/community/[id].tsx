import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Answer, Post, User } from "@prisma/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMutation from "@libs/cleint/useMutation";
import { cls } from "@libs/cleint/utils";
import Image from "next/image";
import client from "@libs/server/client";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wondering: number;
  };
  answers: AnswerWithUser[];
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  response: Answer;
}

const CommunityPostDetail: NextPage<CommunityPostResponse> = ({
  post,
  isWondering,
}) => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const { data, mutate } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [wonder, { loading }] = useMutation(
    `/api/posts/${router.query.id}/wonder`
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answers`);
  const onWonderClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            wondering: data.isWondering
              ? post._count.wondering - 1
              : post._count.wondering + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    if (!loading) {
      wonder({});
    }
  };
  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form);
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset, mutate]);
  if (router.isFallback) {
    return (
      <Layout title="loading for uuuuu">
        <span>i love u</span>
      </Layout>
    );
  }
  return (
    <Layout seoTitle="Community Questions" canGoBack>
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
          <Image
            src={`https://imagedelivery.net/V_VgYLYXooAb_-AJyJfp_Q/${post?.user?.avatar}/avatar`}
            className="h-12 w-12 rounded-full bg-slate-300"
            width={48}
            height={48}
            alt=""
          />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {post?.user?.name}
            </p>
            <Link href={`/users/profiles/${post?.user?.name}`}>
              <a className="text-xs font-medium text-gray-500">
                View profile &rarr;
              </a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">Q.</span>{" "}
            {post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5  text-gray-700">
            <button
              onClick={onWonderClick}
              className={cls(
                "flex items-center space-x-2 text-sm",
                isWondering ? "text-teal-400" : ""
              )}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {post?._count?.wondering}</span>
            </button>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {post?._count?.answers}</span>
            </span>
          </div>
        </div>
        <div className="my-5 space-y-5 px-4">
          {post?.answers?.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <Image
                src={`https://imagedelivery.net/V_VgYLYXooAb_-AJyJfp_Q/${answer.user.avatar}/avatar`}
                className="h-12 w-12 rounded-full bg-slate-300"
                width={36}
                height={36}
                alt=""
              />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {answer.user.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {String(answer.createdAt)}
                </span>
                <p className="mt-2 text-gray-700">{answer.answer} </p>
              </div>
            </div>
          ))}
        </div>
        <form className="px-4" onSubmit={handleSubmit(onValid)}>
          <TextArea
            name="description"
            placeholder="Answer this question!"
            required
            register={register("answer", { required: true, minLength: 5 })}
          />
          <button className="mt-2 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
            {answerLoading ? "Loading..." : "Reply"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }
  const post = await client.post.findUnique({
    where: {
      id: +ctx.params.id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wondering: true,
        },
      },
    },
  });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: +ctx.params.id.toString(),
        userId: post.user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  return {
    props: {
      ok: true,
      post: JSON.parse(JSON.stringify(post)),
      isWondering,
    },
    // revalidate: 5,
  };
};

export default CommunityPostDetail;
