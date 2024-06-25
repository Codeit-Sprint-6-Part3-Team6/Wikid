import React from "react";
import Image from "next/image";

interface IconButtonProps {
  src: string;
  alt: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ src, alt, className }) => {
  return (
    <button>
      <Image src={src} alt={alt} className={`${className}`} />
    </button>
  );
};

export default IconButton;
