import { z } from "zod";

const EMAIL_PATTERN = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;

export const signupSchema = z
  .object({
    part: z.enum(["frontend", "backend"]),
    team: z.string().min(1),
    member: z.string().min(1),
    username: z.string().min(1),
    email: z.string().regex(EMAIL_PATTERN, "이메일 형식이 올바르지 않습니다"),
    password: z.string().min(1),
    passwordRe: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordRe, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordRe"],
  });

export type SignupForm = z.infer<typeof signupSchema>;
