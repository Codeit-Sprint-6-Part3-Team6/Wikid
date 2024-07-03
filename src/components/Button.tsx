interface ButtonProps {
  text: string;
  color: "green" | "white" | "red";
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?:
    | (() => Promise<void>)
    | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void>)
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
  const primaryStyle =
    color === "green"
      ? "bg-green200 text-white"
      : color === "white"
        ? "bg-white text-green200"
        : "bg-red300 text-white";

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
