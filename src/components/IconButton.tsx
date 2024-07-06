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
  totalCount?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  src,
  alt,
  onClick,
  className,
  unoptimized,
  width,
  height,
  totalCount,
}) => {
  return (
    <button type="button" onClick={onClick} className="relative !p-0">
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        className={`${className}`}
        unoptimized={unoptimized}
      />
      {totalCount ? (
        <div className="absolute -right-[5px] -top-[6px] rounded-full bg-red-500 px-[6px] text-[10px] font-[600] text-white">
          {totalCount}
        </div>
      ) : null}
    </button>
  );
};

export default IconButton;
