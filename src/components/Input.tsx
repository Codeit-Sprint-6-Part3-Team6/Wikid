import React, { InputHTMLAttributes } from "react";

const searchIcon = "/icons/ic_search.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "search";
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  value,
  error,
  onChange,
  onBlur,
  ...rest
}) => {
  const commonClasses =
    "w-full bg-gray-50 transition-all duration-500 rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-white";

  const inputClass =
    `max-w-[400px] ${commonClasses} ` +
    (error
      ? "bg-red100"
      : value && !error
        ? "bg-white ring-2 ring-green300"
        : "bg-gray-50 hover:bg-gray-200 focus:bg-white");

  // type이 "search"일 때 검색 아이콘과 함께 렌더링되는 input
  const inputElement =
    type === "search" ? (
      <div
        className={`group flex max-w-[800px] ${commonClasses} focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-200`}
      >
        <img src={searchIcon} alt="검색 아이콘" />
        <input
          type="search"
          className={`w-full bg-gray-50 transition-all duration-500 focus:bg-white group-hover:bg-gray-200`}
          placeholder="검색어를 입력해 주세요"
          {...rest}
        />
      </div>
    ) : (
      // 그 외의 경우는 같은 input으로 렌더링
      <div>
        <input
          type={type}
          name={name}
          className={`${inputClass} + focus:ring-1 focus:ring-gray-200`}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
        {error && <p className="mt-2.5 text-sm text-red300">{error}</p>}
      </div>
    );

  return <div>{inputElement}</div>;
};

export default Input;
