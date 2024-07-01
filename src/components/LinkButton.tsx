import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  text: string;
  link: string;
  color: "gray" | "white" | "green";
  className?: string;
}

const LinkButton = ({ text, link, color, className }: LinkButtonProps) => {
  let colors = "";

  if (color === "gray") {
    colors = "bg-[var(--color-gray500)] text-[var(--color-white)]";
  } else if (color === "white") {
    colors = "bg-[var(--color-white)] text-[var(--color-gray500)]";
  } else {
    colors = "bg-[var(--color-green200)] text-[var(--color-white)]";
  }

  return (
    <Link href={link}>
      <button className={`${colors} ${className} rounded-[10px]`}>
        {text}
      </button>
    </Link>
  );
};

export default LinkButton;

// type3
// 게시물 등록하기-linkButton
// width 160, height 45, --color-green200, --color-white

// type7
// 삭제하기-linkButton, 목록으로-linkButton, 등록하기-linkButton
// width 140, height 45,  --color-green200, --color-white

// type9
// 위키만들기(메인)-linkButton
// width 170, height 59, --color-gray600, --color-white

// type10
// 지금 시작하기(메인)-linkButton
// width 190, height 59, --color-white, --color-gray800
