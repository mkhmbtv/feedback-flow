import { notFound } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { FeedbackForm } from "@/components/feedback-form";
import { FeedbackSection } from "@/components/feedback-section";
import { db } from "@/lib/db";

interface SiteFeedbackPageProps {
  params: {
    site: string[];
  };
}

export default async function SiteFeedbackPage({
  params,
}: SiteFeedbackPageProps) {
  const site = await db.site.findUnique({
    where: {
      id: params.site[0],
    },
  });

  if (!site) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        title={site.name}
        description={`All feedback for ${site.name}`}
      />
      <FeedbackForm siteId={site.id} />
      <FeedbackSection siteId={site.id} />
    </DashboardShell>
  );
}
