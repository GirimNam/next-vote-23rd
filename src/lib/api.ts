import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { API_ENDPOINTS } from "@/constants/endpoint";

//맨처음에 백엔드 api 자겨오는 부분
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

//api 인터셉터 부분
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const skipReissue = [API_ENDPOINTS.AUTH.LOGIN, API_ENDPOINTS.AUTH.REISSUE].some(
      (path) => originalRequest.url?.includes(path),
    );

    if (error.response?.status === 401 && !originalRequest._retry && !skipReissue) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}${API_ENDPOINTS.AUTH.REISSUE}`,
          {},
          { withCredentials: true },
        );
        const newToken = data.data.accessToken;
        useAuthStore.getState().setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (reissueError) {
        useAuthStore.getState().clearAuth();
        const code =
          axios.isAxiosError(reissueError)
            ? (reissueError.response?.data?.error?.code ?? "session")
            : "session";
        window.location.href = `/login?reason=${code}`;
      }
    }

    return Promise.reject(error);
  },
);
