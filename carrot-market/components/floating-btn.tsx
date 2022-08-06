import Link from "next/link";
import React from "react";

interface Ifloat {
  href: string;
  children: React.ReactNode;
}

export default function FloatingBtn({ children, href }: Ifloat) {
  return (
    <Link href={href}>
      <a className="fixed cursor-pointer hover:bg-orange-400 transition-colors bottom-24 right-5 bg-orange-500 rounded-full p-4 text-white shadow-xl">
        {children}
      </a>
    </Link>
  );
}
