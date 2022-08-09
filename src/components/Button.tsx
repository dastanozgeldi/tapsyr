const Button = ({
  children,
  className = "",
  onClick = undefined,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-teal-400 hover:bg-teal-500 duration-300 font-bold p-4 text-white rounded-md text-2xl ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
