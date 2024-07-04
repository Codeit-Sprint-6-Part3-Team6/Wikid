import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
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

export default useAuth;
