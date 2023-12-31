export const Button = ({
  title = "Submit",
  className,
  handleClick,
  Icon = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`bg-slate-700 rounded py-2 px-4 w-full text-white text-sm hover:bg-slate-800 ${className}`}
    >
      {Icon && <span>{Icon}</span>}
      {title}
    </button>
  );
};
