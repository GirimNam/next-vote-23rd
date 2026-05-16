"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/schemas/login";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

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
  const { login } = useAuth();
  const username = watch("username");
  const password = watch("password");

  const onSubmit = async (_data: LoginForm) => {
    try {
      /* 백엔드 연동 시 주석 해제
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const { accessToken } = await res.json();
      login(accessToken);
      */

      // 임시: API 연동 전까지 더미 토큰으로 로그인 처리
      login("dummy-token");
      router.push("/members");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <main className="flex flex-col gap-3.5 w-full md:w-137.5 px-6 md:px-0">
      <p className="text-heading1 py-3 border-b mb-5">LOGIN</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
        <label className="flex flex-col">
          <input
            type="text"
            {...register("username")}
            className="border h-12 outline-none px-2"
            placeholder="아이디를 입력해주세요."
          />
          <p className="text-label2 text-red-500 py-1 min-h-6">
            {username.length > 0 && errors.username
              ? errors.username.message
              : " "}
          </p>
        </label>

        <label className="flex flex-col">
          <input
            type="password"
            {...register("password")}
            className="border h-12 outline-none px-2"
            placeholder="비밀번호를 입력해주세요."
          />
          <p className="text-label2 text-red-500 py-1 min-h-6">
            {password.length > 0 && errors.password
              ? errors.password.message
              : " "}
          </p>
        </label>

        <button
          type="submit"
          className="border h-16 bg-black text-white cursor-pointer"
        >
          로그인 하기
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
