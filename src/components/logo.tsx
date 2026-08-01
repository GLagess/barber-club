"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoMarkProps = { size?: number; className?: string };
export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <div
      className={cn("shrink-0 overflow-hidden rounded-xl", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Use Barber Club"
        width={size}
        height={size}
        className="w-full h-full object-cover"
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
