import { notFound } from "next/navigation";
import { isKeystaticAdminEnabled } from "@/lib/security.mjs";

export default async function KeystaticPage() {
  if (!isKeystaticAdminEnabled(process.env)) {
    notFound();
  }

  const { default: KeystaticAdmin } = await import("./KeystaticAdmin");
  return <KeystaticAdmin />;
}
