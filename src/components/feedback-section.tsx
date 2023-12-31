import { db } from "@/lib/db";
import { Feedback } from "./feedback";

interface FeedbackSectionProps {
  siteId: string;
  route: string;
}

export async function FeedbackSection({ siteId, route }: FeedbackSectionProps) {
  const allFeedback = await db.feedback.findMany({
    where: {
      siteId,
      route,
      status: "APPROVED",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      site: {
        select: {
          socialLogos: true,
          timestamps: true,
          ratings: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return allFeedback.length > 0 ? (
    <div className="mb-10 flex flex-col">
      {allFeedback.map((feedback, index) => (
        <Feedback
          key={feedback.id}
          data={feedback}
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
