"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TEAM_MEMBERS, TEAM_NAMES } from "@/constants/teams";
import { signupSchema, SignupForm } from "@/schemas/signup";

type DropdownProps = {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

function Dropdown({
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="flex items-center gap-4 relative">
      <span className="hidden md:inline text-label1 shrink-0">{label}</span>
      <div className="flex-1 relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className="w-full h-10 border-b px-1 flex items-center justify-between cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            className={`whitespace-nowrap overflow-hidden text-ellipsis text-sm md:text-base ${
              value ? "text-black" : "text-gray-400"
            }`}
          >
            {value || placeholder}
          </span>
          <span className="text-xs">▾</span>
        </button>
        {open && options.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-1 border bg-white shadow-md z-10 max-h-60 overflow-auto">
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Signup() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      part: "frontend",
      team: "",
      member: "",
      username: "",
      email: "",
      password: "",
      passwordRe: "",
    },
  });

  const part = watch("part");
  const team = watch("team");
  const email = watch("email");
  const passwordRe = watch("passwordRe");

  const memberOptions =
    team && TEAM_MEMBERS[part][team as keyof (typeof TEAM_MEMBERS)["frontend"]]
      ? TEAM_MEMBERS[part][team as keyof (typeof TEAM_MEMBERS)["frontend"]]
      : [];

  const handlePartChange = (next: SignupForm["part"]) => {
    if (next === part) return;
    setValue("part", next);
    setValue("team", "");
    setValue("member", "");
  };

  const onSubmit = (data: SignupForm) => {
    console.log(data);
    // TODO: 회원가입 API 연동
  };

  return (
    <main className="flex flex-col gap-[1.88rem] w-full px-[1.25rem] md:w-[34.375rem] md:px-0">
      <p className="text-[1.25rem] font-extrabold leading-[135%] tracking-[-0.00125rem] py-3 border-b">
        SIGNUP
      </p>

      <div className="flex">
        {(["frontend", "backend"] as const).map((p, idx) => {
          const selected = part === p;
          const rounded = idx === 0 ? "rounded-l-[0.75rem]" : "rounded-r-[0.75rem]";
          return (
            <button
              key={p}
              type="button"
              onClick={() => handlePartChange(p)}
              className={`w-1/2 md:w-[17.1875rem] h-[3.1875rem] border border-black text-label2 cursor-pointer transition-colors ${rounded} ${
                selected ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {p === "frontend" ? "FRONT - END" : "BACK - END"}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="team"
            control={control}
            render={({ field }) => (
              <Dropdown
                label="팀"
                value={field.value}
                placeholder="팀을 선택해 주세요"
                options={TEAM_NAMES as unknown as string[]}
                onChange={(v) => {
                  field.onChange(v);
                  setValue("member", "");
                }}
              />
            )}
          />
          <Controller
            name="member"
            control={control}
            render={({ field }) => (
              <Dropdown
                label="이름"
                value={field.value}
                placeholder="이름을 선택해 주세요"
                options={memberOptions}
                onChange={field.onChange}
                disabled={!team}
              />
            )}
          />
        </div>

        <label className="flex items-center mt-[1.88rem]">
          <span className="text-label1 w-[5rem] md:w-[8.75rem] shrink-0 md:whitespace-nowrap">
            아이디
          </span>
          <input
            type="text"
            {...register("username")}
            placeholder="아이디를 입력해 주세요"
            className="flex-1 border-b border-black outline-none p-3"
          />
        </label>

        <label className="flex items-center mt-[1.88rem]">
          <span className="text-label1 w-[5rem] md:w-[8.75rem] shrink-0 md:whitespace-nowrap">
            이메일
          </span>
          <input
            type="email"
            {...register("email")}
            placeholder="이메일을 입력해 주세요"
            className="flex-1 border-b border-black outline-none p-3"
          />
        </label>

        <p className="text-label2 text-red-500 py-2 ml-[5rem] md:ml-[8.75rem] pl-3 min-h-[2.5rem]">
          {email.length > 0 && errors.email ? errors.email.message : " "}
        </p>

        <label className="flex items-center">
          <span className="text-label1 w-[5rem] md:w-[8.75rem] shrink-0 md:whitespace-nowrap">
            비밀번호
          </span>
          <input
            type="password"
            {...register("password")}
            placeholder="비밀번호를 입력해 주세요"
            className="flex-1 border-b border-black outline-none p-3"
          />
        </label>

        <label className="flex items-center mt-[1.88rem]">
          <span className="text-label1 w-[5rem] md:w-[8.75rem] shrink-0 md:whitespace-nowrap">
            비밀번호 재확인
          </span>
          <input
            type="password"
            {...register("passwordRe")}
            placeholder="비밀번호를 다시 입력해 주세요"
            className="flex-1 border-b border-black outline-none p-3"
          />
        </label>

        <p className="text-label2 text-red-500 py-2 ml-[5rem] md:ml-[8.75rem] pl-3 min-h-[2.5rem]">
          {passwordRe.length > 0 && errors.passwordRe
            ? errors.passwordRe.message
            : " "}
        </p>

        <button
          type="submit"
          className="w-full py-4 bg-black text-white text-label1 cursor-pointer mt-[0.69rem]"
        >
          회원가입하기
        </button>
      </form>
    </main>
  );
}
