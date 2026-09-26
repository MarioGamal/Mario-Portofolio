"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "./navLinks";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="py-6 xl:py-8">
      <div className="container flex items-center justify-between gap-6">
        <Link href="/" className="text-lg font-[760] wide">
          Mario Iskander
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav aria-label="Main" className="flex gap-7">
            {navLinks.map((link) => {
              const current = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={current ? "page" : undefined}
                  className={`border-b-2 pb-0.5 transition-colors ${
                    current ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
