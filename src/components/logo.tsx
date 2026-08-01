"use client";
import { Scissors } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoMarkProps = { size?: number; className?: string };
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <div
      className={cn("flex items-center justify-center rounded-xl shrink-0", className)}
      style={{ width: size, height: size, background: "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)" }}
    >
      <Scissors
        size={size * 0.55}
        className="text-[#0A0A0A]"
        strokeWidth={2.5}
      />
    </div>
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
