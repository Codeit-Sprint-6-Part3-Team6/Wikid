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
