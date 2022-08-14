import { FieldError, FieldErrors, useForm } from "react-hook-form";

// wishes
// less code (o)
// better validation
// better errors (set, clear, display)
// have control over inputs
// don't deal with events (o)
// easier inputs (o)

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const { register, watch, handleSubmit } = useForm<LoginForm>({});
  //   console.log(watch());
  const onValid = (data: LoginForm) => {
    console.log("i'm valid babe");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          //   required: true,
          required: "Username is required",
          minLength: {
            message: "Username should be longer than 5 chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          //   required: true,
          required: "Email is required",
        })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", {
          //   required: true,
          required: "Password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
