"use client";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: ErrorModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-[#191F28] text-white rounded-2xl px-6 py-8 flex flex-col items-center gap-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-caption1 font-semibold text-center">{message}</p>

        <div className="flex w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-white bg-white text-black text-caption2 font-semibold cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
