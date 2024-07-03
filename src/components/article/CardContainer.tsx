import React from "react";

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

const CardContainer = ({ children, className }: CardContainerProps) => {
  return (
    <div
      className={`flex w-full max-w-[1060px] justify-between rounded-lg px-[30px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
