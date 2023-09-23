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
      tags: [`${siteId}-data`],
      revalidate: 10,
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
      tags: [`${siteId}-${route}-feedback`],
      revalidate: 10,
    },
  )();
}
