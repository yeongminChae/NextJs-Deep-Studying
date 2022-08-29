import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import useUser from "@libs/cleint/useUser";
import { useForm } from "react-hook-form";
import Input from "@components/input";
import { useEffect, useState } from "react";
import useMutation from "@libs/cleint/useMutation";
import Router, { useRouter } from "next/router";
import useSWR from "swr";

interface EditPriofile {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
  avatar?: FileList;
}

interface EditPriofileResponse {
  ok: boolean;
  error?: string;
}

const EditPriofile: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditPriofile>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/V_VgYLYXooAb_-AJyJfp_Q/${user?.avatar}/public`
      );
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<EditPriofileResponse>(`/api/users/me`);
  const onValid = async ({ email, phone, name, avatar }: EditPriofile) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "email or phone num is empty u need to put a value",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editProfile({
        email,
        phone,
        name,
        avatarID: id,
      });
    } else {
      editProfile({ email, phone, name });
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  useEffect(() => {
    if (data?.ok === true) {
      router.push(`/profile`);
    }
  }, [data, router]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img src={avatarPreview} className="w-14 h-14 rounded-full" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            className="cursor-pointer py-2 px-3 
            border border-gray-300 rounded-md shadow-sm font-medium
            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none 
            text-white bg-orange-500 hover:bg-orange-600 text-sm
            "
          >
            Change Photo
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center  block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? "Loading..." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditPriofile;
