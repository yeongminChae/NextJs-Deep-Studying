import { useForm } from "react-hook-form";

// wishes
// less code (o)
// better validation
// better errors (set, clear, display)
// have control over inputs
// don't deal with events (o)
// easier inputs (o)

export default function Forms() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <form>
      <input
        {...register("username")}
        type="text"
        placeholder="Username"
        required
      />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
