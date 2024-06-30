import React from "react";
import Image from "next/image";

interface IconButtonProps {
  src: string;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  src,
  alt,
  onClick,
  className,
}) => {
  return (
    <button type="button" onClick={onClick}>
      <Image src={src} alt={alt} className={`${className}`} />
    </button>
  );
};

export default IconButton;
