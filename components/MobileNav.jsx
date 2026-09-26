"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { navLinks } from "./navLinks";
import ThemeToggle from "./ThemeToggle";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="rounded-[3px] border border-line px-3 py-1.5 text-sm">Menu</SheetTrigger>
      <SheetContent className="flex flex-col gap-10 pt-20">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Main" className="flex flex-col gap-5">
          {[{ name: "Home", path: "/" }, ...navLinks].map((link) => (
            <SheetClose asChild key={link.path}>
              <Link
                href={link.path}
                aria-current={pathname === link.path ? "page" : undefined}
                className={`text-xl font-[700] wide ${pathname === link.path ? "text-accent" : ""}`}
              >
                {link.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-line pt-6">
          <span className="text-sm text-muted">Theme</span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
