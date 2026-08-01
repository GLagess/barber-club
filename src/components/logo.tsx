"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoMarkProps = { size?: number; className?: string };

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={cn("shrink-0", className)}
    >
      {/* Background square */}
      <rect width="40" height="40" rx="10" fill="#C9A84C" fillOpacity="0.15" />
      {/* Scissors blade 1 (top-left to bottom-right) */}
      <path
        d="M13 13 C13 13 22 20 27 27"
        stroke="#C9A84C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Scissors blade 2 (bottom-left to top-right) */}
      <path
        d="M13 27 C13 27 22 20 27 13"
        stroke="#C9A84C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left handle circle */}
      <circle cx="11" cy="13" r="3" stroke="#C9A84C" strokeWidth="1.8" fill="none" />
      {/* Right handle circle */}
      <circle cx="11" cy="27" r="3" stroke="#C9A84C" strokeWidth="1.8" fill="none" />
      {/* Screw in the middle */}
      <circle cx="20" cy="20" r="1.5" fill="#C9A84C" />
    </svg>
  );
}

type LogoProps = { href?: string; showText?: boolean; size?: number; className?: string };

export function Logo({ href = "/", showText = true, size = 32, className }: LogoProps) {
  const fontSize = size >= 40 ? "text-xl" : "text-base";
  return (
    <Link href={href} className={cn("flex items-center gap-2.5 group", className)}>
      <LogoMark size={size} />
      {showText && (
        <span className={cn("font-bold text-white tracking-tight leading-none", fontSize)}>
          Use Barber Club
        </span>
      )}
    </Link>
  );
}
