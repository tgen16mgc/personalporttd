"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { personal } from "@/content/personal";
import { normalizeNavigationHref } from "@/lib/security.mjs";

export function Navigation() {
  const pathname = usePathname();
  return <nav className="site-nav" aria-label="Primary">{personal.navigation.map((item) => {
    const href = normalizeNavigationHref(item.href);
    const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
    return <Link key={href} href={href} aria-current={active ? "page" : undefined} data-cursor={item.label}>{item.label}</Link>;
  })}</nav>;
}
