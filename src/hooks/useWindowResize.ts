import { useEffect, useState } from "react";

export function useWindowResize(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth >= 357 && window.innerWidth <= 767);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// 모바일에서 버튼 컴포넌트가 이미지 컴포넌트로 바뀌는 것을 구현하기 위한 훅입니다.
