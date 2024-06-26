import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/6-6/",
  withCredentials: true, // request 보낼 때 항상 쿠키를 쓰도록 설정
});

// interceptor
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    // 401 Unauthorized Error 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지 플래그 설정
      try {
        // 토큰 새로고침 요청
        await instance.post("/6-6/auth/refresh-token", undefined, {
          headers: { "Content-Type": "application/json" },
        });
        return instance(originalRequest);
      } catch (refreshError) {
        // 실패하면 에러 반환
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // 다른 모든 에러는 그대로 반환
  },
);

export default instance;
