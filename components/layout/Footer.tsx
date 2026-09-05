import { ArrowUpRight } from "lucide-react";
import { personal } from "@/content/personal";
import { getSafeExternalHref } from "@/lib/security.mjs";

export function Footer() {
  const facebook = getSafeExternalHref(personal.facebook);
  return <footer className="site-footer"><p>&copy; {new Date().getFullYear()} {personal.name}</p><p>{personal.footerQuote}</p>{facebook && <a href={facebook} target="_blank" rel="noopener noreferrer">Facebook <ArrowUpRight size={14} /></a>}</footer>;
}
