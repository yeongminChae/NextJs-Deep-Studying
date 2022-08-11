interface IinputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price";
  [key: string]: any;
}

export default function Input({
  label,
  name,
  kind = "text",
  ...rest
}: IinputProps) {
  return (
    <div>
      <label className="mb-1 text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      {kind === "text" ? (
        <div className="rounded-md shadow-sm flex items-center relative ">
          <input
            id={name}
            {...rest}
            className="appearance-none w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500  "
          />
        </div>
      ) : null}
      {kind === "price" ? (
        <div className="rounded-md shadow-sm flex items-center relative ">
          <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none  ">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id={name}
            {...rest}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none ">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 secelt-none text-sm">
            +82
          </span>
          <input
            id={name}
            {...rest}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 "
          />
        </div>
      ) : null}
    </div>
  );
}
