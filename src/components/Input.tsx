import React, { InputHTMLAttributes } from "react";

const searchIcon = "/icons/ic_search.svg";

// label이 있는 input도 있고 없는 input도 있기 때문에 prop으로 받도록 설정
// label prop이 제공된 경우 input 위에 레이블을 렌더링하고, 제공되지 않은 경우 input만 렌더링되고 레이블은 렌더링되지 않음
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: "text" | "email" | "password" | "search";
}

const Input: React.FC<InputProps> = ({ label, type = "text", ...rest }) => {
  const commonClasses =
    "w-full bg-gray-50 transition-all duration-500 rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-white";

  // type이 "search"일 때 검색 아이콘과 함께 렌더링되는 input
  const inputElement =
    type === "search" ? (
      <div
        className={`group flex max-w-[800px] gap-4 ${commonClasses} focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-200`}
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
      <input
        type={type}
        className={`max-w-[400px] focus:ring-1 focus:ring-gray-200 ${commonClasses}`}
        {...rest}
      />
    );

  return (
    <div className="flex w-full flex-col gap-2.5">
      {label && (
        <label htmlFor={rest.id} className="mt-6 text-gray-800">
          {label}
        </label>
      )}
      {inputElement}
    </div>
  );
};

export default Input;
