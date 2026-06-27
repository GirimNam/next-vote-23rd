import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/constants/endpoint";

type SignupRequest = {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  name: string;
  part: string;
  team: string;
};

type SignupResponse = {
  success: boolean;
  data: {
    userId: number;
    username: string;
    name: string;
    part: string;
    team: string;
  } | null;
  error: {
    status: number;
    code: string;
    message: string;
  } | null;
};

type LoginRequest = {
  username: string;
  password: string;
};

type AuthResponse = {
  success: boolean;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    user: {
      userId: number;
      username: string;
      name: string;
      part: string;
      team: string;
    };
  } | null;
  error: {
    status: number;
    code: string;
    message: string;
  } | null;
};

type ReissueResponse = {
  success: boolean;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  } | null;
  error: {
    status: number;
    code: string;
    message: string;
  } | null;
};

export async function signup(body: SignupRequest): Promise<SignupResponse> {
  const { data } = await api.post<SignupResponse>(
    API_ENDPOINTS.AUTH.SIGNUP,
    body,
  );
  return data;
}

export async function login(body: LoginRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, body);
  return data;
}

export async function reissue(): Promise<ReissueResponse> {
  const { data } = await api.post<ReissueResponse>(API_ENDPOINTS.AUTH.REISSUE, {});
  return data;
}

export async function logout(): Promise<void> {
  await api.post(API_ENDPOINTS.AUTH.LOGOUT, {});
}
