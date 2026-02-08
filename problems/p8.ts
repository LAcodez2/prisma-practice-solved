import { groupBy, maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async (): Promise<
  number | undefined
> => {
  const ratings = await prisma.starRating.findMany({
    select: { userId: true, score: true },
  });

  if (ratings.length === 0) return undefined;

  const grouped = groupBy(ratings, (r) => r.userId);

  const averages = Object.entries(grouped).map(([userId, userRatings]) => {
    const total = userRatings.reduce((sum, r) => sum + r.score, 0);
    const avg = total / userRatings.length;
    return { userId: Number(userId), avg };
  });

  return minBy(averages, (u) => u.avg)?.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async (): Promise<number | undefined> => {
  const ratings = await prisma.starRating.findMany({
    select: { userId: true, score: true },
  });

  if (ratings.length === 0) return undefined;

  const grouped = groupBy(ratings, (r) => r.userId);

  const averages = Object.entries(grouped).map(([userId, userRatings]) => {
    const total = userRatings.reduce((sum, r) => sum + r.score, 0);
    const avg = total / userRatings.length;
    return { userId: Number(userId), avg };
  });

  return maxBy(averages, (u) => u.avg)?.userId;
};
