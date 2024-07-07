import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { postSignIn, postSignUp } from "@lib/api/authApi";

interface AuthContextType {
  isLoggedIn: boolean;
  signup: ({ email, password }: SignUpProps) => Promise<void | Error>;
  login: ({ email, password }: LoginProps) => Promise<void | Error>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
interface LoginProps {
  email: string;
  password: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  async function signup({
    name,
    email,
    password,
    passwordConfirmation,
  }: SignUpProps): Promise<void> {
    try {
      const response = await postSignUp({
        name,
        email,
        password,
        passwordConfirmation,
      });

      if (response.status === 201) {
        alert("가입이 완료되었습니다");
        router.push("/login"); // 회원가입 성공 후 로그인 페이지로 이동
      }
    } catch (error: any) {
      return error;
    }
  }

  async function login({ email, password }: LoginProps): Promise<void> {
    try {
      const response = await postSignIn({ email, password });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        Cookies.set("accessToken", accessToken, { secure: true });
        Cookies.set("refreshToken", refreshToken, { secure: true });

        setIsLoggedIn(true);
        window.location.reload();
        router.push("/");
      }
    } catch (error: any) {
      return error;
    }
  }

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    window.location.reload();
    router.push("/");
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get("accessToken");
      setIsLoggedIn(!!accessToken);
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
