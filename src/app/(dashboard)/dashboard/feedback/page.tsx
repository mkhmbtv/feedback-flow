import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { EmptyState } from "@/components/empty-state";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { FeedbackTable } from "@/components/feedback-table";
import type { FeedbackWithAuthor } from "@/types";

export const metadata: Metadata = {
  title: "Feedback",
};

async function getAllFeedbackForSites(
  userId: string,
): Promise<FeedbackWithAuthor[]> {
  const userWithSitesFeedback = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      sites: {
        include: {
          feedback: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  const allFeedback: FeedbackWithAuthor[] = userWithSitesFeedback!.sites
    .flatMap((site) => site.feedback)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return allFeedback;
}

export default async function FeedbackPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const allFeedback = await getAllFeedbackForSites(session.user.id);

  return (
    <DashboardShell>
      <DashboardHeader
        title="Feedback"
        description="Manage feedback for your sites"
      />
      <div>
        {allFeedback?.length > 0 ? (
          <FeedbackTable allFeedback={allFeedback} />
        ) : (
          <EmptyState>
            <EmptyState.Icon name="layout" />
            <EmptyState.Title>No feedback for your sites yet</EmptyState.Title>
            {/* <EmptyState.Description>
              
            </EmptyState.Description> */}
          </EmptyState>
        )}
      </div>
    </DashboardShell>
  );
}
