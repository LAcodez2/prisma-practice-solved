import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (
  n: number
): Promise<Movie[]> => {
  const movies = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });

  return movies
    .filter((movie) => {
      const ratings = movie.starRatings;
      if (ratings.length === 0) return false;

      const total = ratings.reduce((sum, r) => sum + r.score, 0);
      const avg = total / ratings.length;

      return avg > n;
    })
    .map(({ starRatings, ...movie }) => movie);
};
