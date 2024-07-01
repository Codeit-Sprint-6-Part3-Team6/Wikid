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
  return (
    <button
      type={type}
      className={`${className} rounded-[10px] border-[1px] border-solid ${
        disabled
          ? "cursor-not-allowed border-gray300 bg-gray300 text-white"
          : "border-green200"
      } text-center ${
        color === "green" && !disabled
          ? "bg-green200 text-white"
          : "bg-white text-green200"
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

// type1
// 로그인-button, 가입하기-button
// width 400, height 45

// type2
// 변경하기-button, 생성하기-button, 시작하기(위키페이지)-button
// width 89, height 40

// type3
// 위키 참여하기-button, 게시물 등록하기-linkButton
// width 160, height 45

// type4
// 확인(퀴즈모달)-button
// width 355, height 40

// type5
// 확인(5분모달)-button
// width 65, height 40

// type6
// 검색-button
// width 80, height 45

// type7
// 수정하기-button, 삭제하기-linkButton, 목록으로-linkButton, 등록하기-linkButton
// width 140, height 45

// type8
// 댓글 등록-button
// width 120, height 45

// type9
// 위키만들기(메인)-linkButton
// width 170, height 59

// type10
// 지금 시작하기(메인)-linkButton
// width 190, height 59

/*
버튼 타입이 너무 많아서 text, color 제외하고는 따로 모아서 prop으로 받을게요
*/
