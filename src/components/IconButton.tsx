import React from "react";
import Image from "next/image";

interface IconButtonProps {
  src: string;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  unoptimized?: boolean; // 외부 이미지의 경우 최적화를 비활성화하기 위함
  width?: number;
  height?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  src,
  alt,
  onClick,
  className,
  unoptimized,
  width,
  height,
}) => {
  return (
    <button type="button" onClick={onClick}>
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        className={`${className}`}
        unoptimized={unoptimized}
      />
    </button>
  );
};

export default IconButton;
