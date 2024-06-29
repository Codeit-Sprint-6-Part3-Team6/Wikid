import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@lib/api/axios";

const AuthContext = createContext({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    isPending: true,
  });

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));

    let nextUser;
    try {
      const res = await axios.get("/users/me");
      nextUser = res.data;
    } catch {
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }) {
    await axios.post("/auth/login", {
      email,
      password,
    });
    await getMe();
  }

  async function logout() {
    await axios.delete("/auth/logout");
    setValues((prevValues) => ({
      ...prevValues,
      user: null,
    }));
  }

  async function updateMe(formData) {
    const res = await axios.patch("/users/me", formData);
    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
      isPending: false,
    }));
  }

  // 새로고침 해도 로그인 정보 유지되도록
  // 처음 렌더링 되면 유저 데이터를 가져오도록
  // useEffect 활용
  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        updateMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  // required boolean
  // required가 true이고, user data가 없으면 login page로 이동
  // request 도중이 아니면서 , 유저 데이터가 없는 로그아웃 상태
  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      navigate("/login");
    }
  }, [context.user, context.isPending, navigate, required]);

  return context;
}
