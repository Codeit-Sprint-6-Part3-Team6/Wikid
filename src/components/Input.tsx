import React, { InputHTMLAttributes } from "react";
import Image from "next/image";
import searchIcon from "@icons/ic_search.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "search";
  name?: string; // 선택적 prop, 유효성 검사에 사용(로그인, 회원가입, 질문 모달 답변 확인 등)
  value?: string;
  error?: string; // 선택적 prop, 유효성 검사에 사용
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 선택적 prop, 유효성 검사에 사용
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // 선택적 prop, 유효성 검사에 사용
  className?: string; // 다른 스타일 속성 추가할 때 사용
  placeholder?: string;
}

const Input = ({
  type = "text",
  name = "",
  value,
  error,
  onChange = () => {},
  onBlur = () => {},
  className,
  ...rest
}: InputProps) => {
  // 공통 클래스 설정
  const commonClasses =
    "w-full bg-gray50 transition-all duration-500 hover:bg-gray-200 focus:bg-white";

  // 컨테이너 클래스 설정
  const containerClass = "rounded-lg px-5 py-2.5";

  // 검색 input 컨테이너 클래스 설정
  const searchContainerClass = `
    ${commonClasses} ${containerClass}
    group flex gap-4
    focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-200
  `;

  // 검색 input 클래스 설정
  const searchInputClass = `${commonClasses} group-hover:bg-gray-200 group-focus:bg-white`;

  // 일반 input 클래스 설정 (에러 여부에 따라 다르게 적용)
  const errorClass = "bg-red100 hover:bg-red100";
  const successClass = "bg-white ring-2 ring-green300";
  const inputClass =
    `max-w-[400px] ${commonClasses} ${containerClass} ` +
    (error ? errorClass : value && !error ? successClass : "");

  const inputElement =
    type === "search" ? (
      <div className={searchContainerClass}>
        <Image src={searchIcon} alt="검색 아이콘" />
        <input
          type="search"
          className={searchInputClass}
          onChange={onChange}
          {...rest}
        />
      </div>
    ) : (
      // 그 외의 경우는 같은 input으로 렌더링
      <div className="w-full">
        <input
          type={type}
          name={name}
          className={`${inputClass} ${className} focus:ring-1 focus:ring-gray-200`}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
        {error && <p className="mt-2.5 text-sm text-red300">{error}</p>}
      </div>
    );

  return inputElement;
};

export default Input;
