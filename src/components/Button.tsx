import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-primary-blue text-white px-4 py-2 hover:bg-primary-green transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;