import { notFound } from "next/navigation";
import { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { FeedbackForm } from "@/components/feedback-form";
import { FeedbackSection } from "@/components/feedback-section";
import { EditSiteModal } from "@/components/edit-site-modal";
import { db } from "@/lib/db";

interface SiteFeedbackPageProps {
  params: {
    site: string[];
  };
}

export async function generateMetadata({
  params,
}: SiteFeedbackPageProps): Promise<Metadata> {
  const site = await db.site.findUnique({
    where: {
      id: params.site[0],
    },
  });

  if (!site) {
    return {};
  }

  return {
    title: site.name,
    description: `All feedback for ${site.url}`,
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

  const route = params.site.length > 1 ? params.site[1] : "/";

  if (!site) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        title={site.name}
        description={`All feedback for ${site.url}`}
      >
        <EditSiteModal site={site} />
      </DashboardHeader>
      <FeedbackForm siteId={site.id} />
      <FeedbackSection siteId={site.id} route={route} />
    </DashboardShell>
  );
}
