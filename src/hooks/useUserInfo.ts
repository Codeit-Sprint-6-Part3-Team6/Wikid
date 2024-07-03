import { useEffect, useState } from "react";
import { getUserInfo } from "@lib/api/userApi";

interface UserInfo {
  id: number;
}

const useUserInfo = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (err: any) {
        // 로그인하지 않은 사용자 오류 처리
        if (err.response && err.response.status === 401) {
          console.info("로그인하지 않은 사용자");
        } else {
          console.error("유저 정보 불러오기 실패");
        }
      }
    };

    fetchUserInfo();
  }, []);

  return { user };
};

export default useUserInfo;
