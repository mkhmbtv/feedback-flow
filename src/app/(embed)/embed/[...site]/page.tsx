import Link from "next/link";
import { notFound } from "next/navigation";

import { Feedback } from "@/components/feedback";
import { getSiteData, getSiteFeedback } from "@/lib/fetchers";
import { db } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "auto";

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
  const siteId = params.site[0];
  const route = params.site[1] ?? "/";
  const [siteData, allFeedback] = await Promise.all([
    getSiteData(siteId),
    getSiteFeedback(siteId, route),
  ]);

  if (!siteData) {
    notFound();
  }

  return allFeedback.length > 0 ? (
    <div className="flex flex-col">
      <Link
        href={`/site/${params.site.join("/")}`}
        className={cn(
          buttonVariants({ variant: "link" }),
          "mb-6 justify-start px-0",
        )}
      >
        Leave a comment
      </Link>
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
