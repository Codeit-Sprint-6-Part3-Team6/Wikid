interface ButtonProps {
  text: string;
  color: "green" | "white" | "red" | "gray";
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?:
    | (() => Promise<void>)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>)
    | (() => void);
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
  let primaryStyle = "";

  if (color === "green") {
    primaryStyle = "bg-green200 text-white";
  } else if (color === "white") {
    primaryStyle = "bg-white text-green200";
  } else if (color === "red") {
    primaryStyle === "bg-red300 text-white";
  } else {
    primaryStyle === "bg-gray300 text-white";
  }

  const disabledStyle = disabled
    ? "cursor-not-allowed border-gray300 bg-gray300 text-white"
    : `${primaryStyle}`;

  return (
    <button
      type={type}
      className={`${className} rounded-[10px] border-[1px] border-solid text-sm font-semibold leading-6 ${disabledStyle}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
