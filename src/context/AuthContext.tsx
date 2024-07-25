import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useApiRequest from "@hooks/useApiRequest";
import { postSignIn, postSignUp } from "@lib/api/authApi";
import { getUserInfo } from "@lib/api/userApi";
import {
  AuthResponseType,
  LoginFormDataType,
  SignUpFormDataType,
  User,
  UserInfo,
} from "@lib/types/Auth";

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserInfo | undefined;
  signup: ({ email, password }: SignUpFormDataType) => void;
  login: ({ email, password }: LoginFormDataType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo>();
  const router = useRouter();
  const [signUpOptions, setSignUpOptions] = useState<SignUpFormDataType>();
  const [loginOptions, setLoginOptions] = useState<LoginFormDataType>();

  const { data: registeredData, toggleTrigger: triggerSignUp } = useApiRequest<
    (options: SignUpFormDataType) => Promise<AuthResponseType>,
    AuthResponseType,
    SignUpFormDataType
  >(postSignUp, signUpOptions, false, () => {
    if (registeredData) {
      alert("가입이 완료되었습니다");
      registerUser(registeredData);
    }
  });
  const { data: loggedInData, toggleTrigger: triggerLogin } = useApiRequest<
    (options: LoginFormDataType) => Promise<AuthResponseType>,
    AuthResponseType,
    LoginFormDataType
  >(postSignIn, loginOptions, false, () => {
    if (loggedInData) registerUser(loggedInData);
  });
  const { data: fetchedUser, toggleTrigger: triggerGetUser } = useApiRequest<
    () => Promise<UserInfo>,
    UserInfo
  >(getUserInfo, undefined, false, () => {
    if (fetchedUser) setUser(fetchedUser);
  });

  const signup = ({ name, email, password, passwordConfirmation }: SignUpFormDataType) => {
    setSignUpOptions({ name, email, password, passwordConfirmation });
    triggerSignUp();
  };

  const login = ({ email, password }: LoginFormDataType) => {
    setLoginOptions({ email, password });
    triggerLogin();
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    window.location.reload();
    router.push("/");
  };

  const registerUser = (authResponse: AuthResponseType) => {
    const { accessToken, refreshToken, user } = authResponse;
    Cookies.set("accessToken", accessToken, { secure: true });
    Cookies.set("refreshToken", refreshToken, { secure: true });
    setIsLoggedIn(true);
    triggerGetUser();

    router.push("/");
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        triggerGetUser();
      }
      setIsLoggedIn(!!accessToken);
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, signup, login, logout }}>
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
