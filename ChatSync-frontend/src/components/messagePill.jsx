export const MessagePill = ({ username, message, time }) => {
  return (
    <div className="bg-slate-300 p-3 rounded w-full mb-2">
      <p className="text-md font-medium text-slate-600 truncate w-28">
        {username}
      </p>
      <p className="text-sm font-medium text-slate-700 mt-2 break-words">
        {message}
      </p>

      <p className="text-xs font-medium text-slate-600 flex justify-end mt-4">
        {time}
      </p>
    </div>
  );
};
