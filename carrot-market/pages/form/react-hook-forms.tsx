import { useForm } from "react-hook-form";

// wishes
// less code (o)
// better validation
// better errors (set, clear, display)
// have control over inputs
// don't deal with events (o)
// easier inputs (o)

export default function Forms() {
  const { register, watch, handleSubmit } = useForm();
  //   console.log(watch());
  const onValid = () => {
    console.log("i'm valid babe");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", {
          required: true,
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: true,
        })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", {
          required: true,
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
