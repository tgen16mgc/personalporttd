import { WorkArchive } from "@/components/work/WorkArchive";
import type { Metadata } from "next";
import { personal } from "@/content/personal";

export const metadata: Metadata = { title: `Selected Work | ${personal.name}` };

export default function WorkPage() {
  return <WorkArchive />;
}
