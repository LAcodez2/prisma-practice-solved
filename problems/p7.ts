import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (
  userId: number,
): Promise<number> => {
  const ratings = await prisma.starRating.findMany({
    where: { userId },
    select: { score: true },
  });

  if (ratings.length === 0) return 0;

  const total = ratings.reduce((sum, r) => sum + r.score, 0);
  const avg = total / ratings.length;

  const truncated = Math.trunc(avg * 10000) / 10000;

  return Number(truncated.toFixed(4));
};
