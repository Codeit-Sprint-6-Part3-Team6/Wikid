import React from "react";
import Image from "next/image";

interface IconButtonProps {
  src: string;
  alt: string;
  className?: string;
}

const IconButton = ({ src, alt, className }: IconButtonProps) => {
  return (
    <button>
      <Image src={src} alt={alt} className={`${className}`} />
    </button>
  );
};

export default IconButton;
