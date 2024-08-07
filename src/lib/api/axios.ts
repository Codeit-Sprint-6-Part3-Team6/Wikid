import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/6-6/",
  withCredentials: false, // request 보낼 때 항상 쿠키를 쓰도록 설정: false 하니까 cors 안뜸
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // 쿠키에서 액세스 토큰 가져오기
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// interceptor
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type RefreshTokenResponse = { accessToken: string };

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    // 401 Unauthorized Error 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지 플래그 설정
      try {
        // 토큰 새로고침 요청
        const refreshToken = Cookies.get("refreshToken");
        const response = await instance.post<RefreshTokenResponse>(
          "auth/refresh-token",
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        Cookies.set("accessToken", response.data.accessToken, { secure: true });
        return instance(originalRequest);
      } catch (refreshError) {
        // 실패하면 에러 반환
        // return Promise.reject(refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      }
    }
    return Promise.reject(error); // 다른 모든 에러는 그대로 반환
  },
);

export default instance;
