import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (event: React.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);
    console.log("added event listener");

    return () => {
      document.removeEventListener("click", handleClick);
      console.log("removed event listener");
    };
  }, [ref]);

  return ref;
};

export default useOutsideClick;
