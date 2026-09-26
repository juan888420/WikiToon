"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/canales", label: "Canales" },
  { href: "/series", label: "Series" },
  { href: "/bloques", label: "Bloques" },
  { href: "/programacion", label: "Programación" },
  { href: "/timeline", label: "Timeline" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex flex-col sm:h-14 sm:flex-row sm:items-center sm:gap-8">
        <Link
          href="/canales"
          className="flex h-12 shrink-0 items-center gap-2 text-[15px] font-semibold tracking-tight sm:h-auto"
        >
          <span aria-hidden className="size-2 rounded-full bg-primary" />
          WikiToon
        </Link>

        <nav
          aria-label="Principal"
          className="-mx-2.5 overflow-x-auto pb-2 [scrollbar-width:none] sm:mx-0 sm:pb-0"
        >
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="site-nav-active"
                        className="absolute inset-0 rounded-md bg-muted"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
