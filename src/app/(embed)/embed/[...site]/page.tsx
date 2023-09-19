import { notFound } from "next/navigation";

import { Feedback } from "@/components/feedback";
import { getSiteData, getSiteFeedback } from "@/lib/fetchers";
import { db } from "@/lib/db";

export async function generateStaticParams() {
  const sites = await db.site.findMany();

  return sites.map((site) => {
    return {
      site: [site.id],
    };
  });
}

interface EmbeddedFeedbackPageProps {
  params: {
    site: string[];
  };
}

export default async function EmbeddedFeedbackPage({
  params,
}: EmbeddedFeedbackPageProps) {
  const [siteData, allFeedback] = await Promise.all([
    getSiteData(params.site[0]),
    getSiteFeedback(params.site[0], params.site[1] ?? "/"),
  ]);

  if (!siteData) {
    notFound();
  }

  return allFeedback.length > 0 ? (
    <div className="flex w-full flex-col">
      {allFeedback.map((feedback, index) => (
        <Feedback
          key={feedback.id}
          data={{ site: siteData, ...feedback }}
          isLast={index === allFeedback.length - 1}
        />
      ))}
    </div>
  ) : (
    <div>
      <h1 className="text-xl font-medium">No Feedback Yet</h1>
      <p className="text-muted-foreground">Be the first to comment.</p>
    </div>
  );
}
