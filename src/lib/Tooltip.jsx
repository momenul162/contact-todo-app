export const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max px-2 py-1 bg-gray-300 text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity md:hidden">
        {text}
      </span>
    </div>
  );
};
