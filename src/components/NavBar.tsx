"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { logout as logoutApi } from "@/api/auth";
import LoginRequiredModal from "@/components/LoginRequiredModal";

interface NavItem {
  label: string;
  href: string;
  protected?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "VOTING", href: "/voting", protected: true },
  { label: "MEMBERS", href: "/members", protected: true },
  { label: "ABOUT US", href: "/about" },
];

const PROTECTED_PATHS = NAV_ITEMS.filter((i) => i.protected).map((i) => i.href);

export default function NavBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [blockedPath, setBlockedPath] = useState<string | undefined>(undefined);
  const isLoggedIn = useAuthStore((s) => s.accessToken !== null);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  // Proxy
  const guardedRouter = useMemo(
    () =>
      new Proxy(router, {
        get(target, prop, receiver) {
          if (prop === "push") {
            return (href: string, options?: Parameters<typeof router.push>[1]) => {
              if (!isLoggedIn && PROTECTED_PATHS.some((p) => href.startsWith(p))) {
                setBlockedPath(href);
                setShowLoginModal(true);
                return Promise.resolve(true);
              }
              return target.push(href, options);
            };
          }
          return Reflect.get(target, prop, receiver);
        },
      }),
    [router, isLoggedIn],
  );

  const handleLogout = async () => {
    try {
      await logoutApi();
      console.log("로그아웃 성공");
    } finally {
      clearAuth();
      router.push("/login");
    }
  };

  return (
    <div className={className}>
      {/* 데스크탑 */}
      <div className="hidden md:flex flex-row">
        <div className="flex items-center w-145 h-9 border-3 px-6 text-body1">
          2026 23RD CEOS AWARDS
        </div>
        <div className="flex items-center justify-around w-145 h-9 bg-black text-white px-7.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                guardedRouter.push(item.href);
              }}
              className={
                pathname === item.href ? "text-blue-500" : "text-white"
              }
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white cursor-pointer"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              href="/login"
              className={pathname === "/login" ? "text-blue-500" : "text-white"}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>

      {/* 모바일 */}
      <div className="flex md:hidden items-center justify-between w-full px-6 py-4">
        <span className="text-caption1  leading-tight">
          CEOS
          <br />
          AWARDS
        </span>
        <button onClick={() => setOpen(true)} className="cursor-pointer">
          <Image
            src="/icons/icon-hamburger.svg"
            alt="메뉴"
            width={24}
            height={24}
          />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex-1" onClick={() => setOpen(false)} />
          <div className="w-2/3 h-full bg-[#191F28] flex flex-col items-end pt-16 px-8 gap-10 relative">
            <button onClick={() => setOpen(false)} className="cursor-pointer">
              <Image
                src="/icons/icon-mobile-x.svg"
                alt="닫기"
                width={24}
                height={24}
              />
            </button>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  guardedRouter.push(item.href);
                }}
                className={`text-2xl font-bold ${pathname === item.href ? "text-blue-500" : "text-white"}`}
              >
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-2xl font-bold text-white cursor-pointer"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={`text-2xl font-bold ${pathname === "/login" ? "text-blue-500" : "text-white"}`}
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}

      {showLoginModal && (
        <LoginRequiredModal
          onClose={() => setShowLoginModal(false)}
          redirectTo={blockedPath}
        />
      )}
    </div>
  );
}
