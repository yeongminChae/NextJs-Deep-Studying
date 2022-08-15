import { FieldError, FieldErrors, useForm } from "react-hook-form";

// wishes
// less code (o)
// better validation (o)
// better errors (set, clear, display) (o)
// have control over inputs (o)
// don't deal with events (o)
// easier inputs (o)

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    resetField,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  const onValid = (data: LoginForm) => {
    console.log("i'm valid babe");
    // setError("username", { message: "taken username " });
    // reset(); global resetting
    resetField("password");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  // console.log(watch("email"));
  // setValue("username", "hello");
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "Username should be longer than 5 chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmaill: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allow",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "Password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  );
}
