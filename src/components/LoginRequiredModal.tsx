"use client";

import { useRouter } from "next/navigation";

interface LoginRequiredModalProps {
  onClose: () => void;
  redirectTo?: string;
}

export default function LoginRequiredModal({ onClose, redirectTo }: LoginRequiredModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    const dest = redirectTo ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login";
    router.push(dest);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-[#191F28] text-white rounded-2xl px-6 py-8 flex flex-col items-center gap-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-caption1 font-semibold text-center">로그인이 필요한 페이지입니다. <br /> 로그인하시겠습니까? </p>
      
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-white bg-white text-black text-caption2 font-semibold  cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleLogin}
            className="flex-1 py-3 rounded-xl bg-blue text-white text-caption2 font-semibold cursor-pointer"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
