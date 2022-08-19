import { UseFormRegisterReturn } from "react-hook-form";

interface ITextArea {
  label?: string;
  name?: string;
  [key: string]: any;
  register: UseFormRegisterReturn;
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: ITextArea) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...register}
        className="mt-1 shadow-sm w-full focus:ring-1 focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
        rows={4}
        {...rest}
      />
    </div>
  );
}
