import { cls } from "../libs/cleint/utils";

interface IMessage {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({ message, reversed, avatarUrl }: IMessage) {
  return (
    <div
      className={cls(
        "flex items-start",
        reversed ? "flex flex-row-reverse space-x-reverse" : "space-x-2 "
      )}
    >
      <div className="w-8 h-8 rounded-full bg-slate-400" />
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{message} </p>
      </div>
    </div>
  );
}
