import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (
  userId: number,
): Promise<number> => {
  const result = await prisma.starRating.aggregate({
    where: { userId },
    _avg: { score: true },
  });

  const avg = result._avg ?? 0;
  return Number(avg.toFixed(4));
};
