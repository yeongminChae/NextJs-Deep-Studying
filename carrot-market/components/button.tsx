import { cls } from "../libs/cleint/utils";

interface IBtn {
  large?: boolean;
  text: string;
  [key: string]: any; // this is allowed to us to send any other props to my input
}

export default function Button({
  large = false,
  text,
  onClick,
  ...rest
}: IBtn) {
  return (
    <button
      {...rest}
      className={cls(
        "mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none w-full",
        large ? "py-3 text-base" : "py-2 text-sm"
      )}
    >
      {text}
    </button>
  );
}
