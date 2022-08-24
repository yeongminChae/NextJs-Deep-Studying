import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import useUser from "@libs/cleint/useUser";
import { useForm } from "react-hook-form";
import Input from "@components/input";
import { useEffect } from "react";

interface EditPriofile {
  email?: string;
  phone?: string;
  formErrors?: string;
}

const EditPriofile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditPriofile>();
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);
  const onValid = ({ email, phone }: EditPriofile) => {
    if (email === "" && phone === "") {
      setError("formErrors", {
        message: "email or phone num is empty u need to put a value",
      });
    }
  };
  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            className="cursor-pointer py-2 px-3 
            border border-gray-300 rounded-md shadow-sm font-medium
            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none 
            text-white bg-orange-500 hover:bg-orange-600 text-sm
            "
          >
            Change Photo
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
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
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center  block">
            {errors.formErrors.message}{" "}
          </span>
        ) : null}
        <Button text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditPriofile;
