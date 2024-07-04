import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// 이거 이름 useAuth에서 useIsLoggedIn 으로 바꿀게요
// AuthContext 안에 useAuth가 존재해요
const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get("accessToken");
      setIsLoggedIn(!!accessToken);
    };

    checkLoginStatus();
  }, []);

  return { isLoggedIn };
};

export default useIsLoggedIn;
