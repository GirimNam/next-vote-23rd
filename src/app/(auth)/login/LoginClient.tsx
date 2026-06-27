"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/schemas/login";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { login } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";


export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const username = watch("username");
  const password = watch("password");

  const [apiFieldErrors, setApiFieldErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearApiFieldError = (field: keyof typeof apiFieldErrors) =>
    setApiFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  const handleLoginError = (status?: number, code?: string) => {
    if (code === "A001") {
      setApiFieldErrors({ username: "존재하지 않는 아이디입니다." });
    } else if (code === "A002") {
      setApiFieldErrors({ password: "비밀번호가 올바르지 않습니다." });
    } else if (status === 400 || code === "C001") {
      setServerError("필수 항목을 모두 입력해 주세요.");
    } else if (status === 500 || code === "C003") {
      setServerError("서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } else {
      setServerError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    setApiFieldErrors({});
    setIsLoading(true);

    try {
      const res = await login({ username: data.username, password: data.password });
      setAuth(res.data!.accessToken, res.data!.user);
      console.log("로그인 성공", res.data!.user);
      const redirect = searchParams.get("redirect");
      router.push(redirect ?? "/voting");

    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response: { status: number; data?: { error?: { code?: string; message?: string } } };
        };

        const { status, data: resData } = axiosErr.response;
        console.error("로그인 실패 status:", status, ", code:", resData?.error?.code, ", message:", resData?.error?.message);
        handleLoginError(status, resData?.error?.code);

      } else {
        console.error("알 수 없는 오류:", err);
        setServerError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col gap-3.5 w-full md:w-137.5 px-6 md:px-0">
      <p className="text-heading1 py-3 border-b mb-5">LOGIN</p>

      <form
        onSubmit={handleSubmit(onSubmit, (fieldErrors) => {
          console.error("로그인 유효성 오류:", fieldErrors);
        })}
        className="flex flex-col gap-3.5"
      >
        <label className="flex flex-col">
          <input
            type="text"
            {...register("username", {
              onChange: () => {
                clearApiFieldError("username");
                clearApiFieldError("password");
              },
            })}
            className="border h-12 outline-none px-2"
            placeholder="아이디를 입력해주세요."
          />
          <p className="text-label2 text-red-500 py-1 min-h-6">
            {apiFieldErrors.username ??
              (username.length > 0 && errors.username ? errors.username.message : " ")}
          </p>
        </label>

        <label className="flex flex-col">
          <input
            type="password"
            {...register("password", {
              onChange: () => {
                clearApiFieldError("username");
                clearApiFieldError("password");
              },
            })}
            className="border h-12 outline-none px-2"
            placeholder="비밀번호를 입력해주세요."
          />

          <p className="text-label2 text-red-500 py-1 min-h-6">
            {apiFieldErrors.password ??
              (password.length > 0 && errors.password ? errors.password.message : " ")}
          </p>
          
        </label>

        {serverError && (
          <p className="text-label2 text-red-500">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="border h-16 bg-black text-white cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "로그인 중..." : "로그인 하기"}
        </button>
      </form>

      <Link
        href="/signup"
        className="text-center cursor-pointer underline text-gray-500"
      >
        아직 계정이 없나요?
        <br className="md:hidden" />
        회원 가입 하러 가기
      </Link>
    </main>
  );
}
