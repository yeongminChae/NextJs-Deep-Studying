import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <form className="flex flex-col space-y-2 p-5 ">
      <input
        type="text"
        required
        placeholder=" Username"
        className="border p-1 peer border-gray-400 rounded-md"
      />
      <span className="hidden peer-invalid:block peer-invalid:text-red-500">
        This input is invalid
      </span>
      <span className="hidden peer-valid:block peer-valid:text-teal-500">
        Awosome Username
      </span>
      <span className="hidden peer-hover:block peer-valid:text-amber-500">
        Hello
      </span>
      <input type="submit" value="login" className="bg-white"></input>
    </form>
  );
};

export default Home;
