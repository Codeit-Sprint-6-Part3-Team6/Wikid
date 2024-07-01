import React from "react";

interface ButtonProps {
  text: string;
  color: "green" | "white";
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string; // text, color를 제외한 모든 스타일 속성들
}

const Button = ({
  text,
  color,
  type,
  disabled,
  onClick,
  className,
}: ButtonProps) => {
  const primaryStyle =
    color === "green" ? "bg-green200 text-white" : "bg-white text-green200";

  const disabledStyle = disabled
    ? "cursor-not-allowed border-gray300 bg-gray300 text-white"
    : `${primaryStyle}`;

  return (
    <button
      type={type}
      className={`${className} rounded-[10px] border-[1px] border-solid ${disabledStyle}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
