// app/referenzen/[slug]/page.tsx
import { notFound } from "next/navigation";
import { referenceProjects } from "@/lib/data/references";
import { ReferenceDetail } from "@/components/referenzen/ReferenceDetail";

type Props = { params: { slug: string } };

export default function Page({ params }: Props) {
  const project = referenceProjects.find((p) => p.id === params.slug);
  if (!project) return notFound();

  return <ReferenceDetail project={project} />;
}
