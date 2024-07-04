import React, { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { postSignIn } from "@lib/api/authApi";

interface AuthContextType {
  isLoggedIn: boolean;
  login: ({ email, password }: LoginProps) => Promise<void | Error>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginProps {
  email: string;
  password: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
