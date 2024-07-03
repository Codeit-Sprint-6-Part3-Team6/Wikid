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
      } catch (err) {
        console.error("유저 정보 불러오기 실패");
      }
    };

    fetchUserInfo();
  }, []);

  return { user };
};

export default useUserInfo;

// 게시글 및 댓글 수정, 삭제 버튼을 조건부로 렌더링하기 위해 사용되는 훅입니다.
// 유저 id와 게시글 및 댓글의 작성자 id를 비교하는 방법으로 구현했습니다.
