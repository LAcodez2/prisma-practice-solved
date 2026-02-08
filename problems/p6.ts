import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const ratings = await prisma.starRating.findMany({
    where: { userId },
    include: { movie: true },
  });

  return ratings.map((ratings) => ratings.movie);
};
