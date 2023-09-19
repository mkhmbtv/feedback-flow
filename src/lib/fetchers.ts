import { unstable_cache } from "next/cache";

import { db } from "./db";

export async function getSiteData(siteId: string) {
  return await unstable_cache(
    async () => {
      return await db.site.findUnique({
        where: {
          id: siteId,
        },
      });
    },
    [`${siteId}-data`],
    {
      revalidate: 900,
      tags: [`${siteId}-data`],
    },
  )();
}

export async function getSiteFeedback(siteId: string, route: string = "/") {
  return await unstable_cache(
    async () => {
      return await db.feedback.findMany({
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
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
    [`${siteId}-${route}-feedback`],
    {
      revalidate: 900,
      tags: [`${siteId}-${route}-feedback`],
    },
  )();
}
