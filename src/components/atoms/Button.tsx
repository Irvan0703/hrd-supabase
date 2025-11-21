interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  color?: "yellow" | "blue" | "red" | "green" | "gray";
}

const colorClasses: Record<string, { solid: string; outline: string; ghost: string }> = {
  yellow: {
    solid: "bg-yellow-400 hover:bg-yellow-500 text-black",
    outline: "border border-yellow-500 text-yellow-600 hover:bg-yellow-50",
    ghost: "text-yellow-600 hover:bg-yellow-100",
  },
  blue: {
    solid: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border border-blue-500 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-100",
  },
  red: {
    solid: "bg-red-500 hover:bg-red-600 text-white",
    outline: "border border-red-500 text-red-600 hover:bg-red-50",
    ghost: "text-red-600 hover:bg-red-100",
  },
  green: {
    solid: "bg-green-500 hover:bg-green-600 text-white",
    outline: "border border-green-500 text-green-600 hover:bg-green-50",
    ghost: "text-green-600 hover:bg-green-100",
  },
  gray: {
    solid: "bg-gray-400 hover:bg-gray-500 text-black",
    outline: "border border-gray-500 text-gray-600 hover:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-200",
  },
};

export default function Button({
  children,
  variant = "solid",
  color = "yellow",
  className = "",
  ...props
}: ButtonProps) {
  const style = colorClasses[color][variant];

  return (
    <button
      {...props}
      className={`
        w-full py-2 rounded-md font-medium transition 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${style} 
        ${className}
      `}
    >
      {children}
    </button>
  );
}
