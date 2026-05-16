"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "VOTING", href: "#" },
  { label: "MEMBERS", href: "/members" },
  { label: "ABOUT US", href: "/about" },
];

export default function NavBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
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
              className="text-blue-500 cursor-pointer"
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

      {/* 모바일 헤더 */}
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

      {/* 모바일 드로어 */}
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
                onClick={() => setOpen(false)}
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
                className="text-2xl font-bold text-blue-500 cursor-pointer"
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
    </div>
  );
}
