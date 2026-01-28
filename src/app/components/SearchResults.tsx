import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  release_date?: string;
};

type Props = {
  keyword: string;
  handleOutClick: () => void;
  results: Movie[];
  onClose: () => void;
};

export const SearchResults = ({ keyword, results, onClose }: Props) => {
  if (!keyword) return null;

  return (
    <div className="relative left-1/2 mt-2 w-[95%] -translate-x-1/2 rounded-md bg-white shadow-lg border border-[#E4E4E7] ">
      {/* Search results list */}
      <ul>
        {results.slice(0, 5).map((movie) => (
          <li
            key={movie.id}
            className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 border-b border-[#E4E4E7]"
          >
            {/* LEFT: Poster + Movie Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {movie.poster_path && (
                <div className="h-[100px] w-[60px] overflow-hidden rounded-md bg-gray-200 flex-shrink-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    width={60}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-lg font-medium text-black truncate">
                  {movie.title}
                </p>
                {movie.vote_average !== undefined && (
                  <p className="flex items-center text-sm">
                    <span className="flex gap-1">
                      <span>⭐</span>
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">/10</span>
                  </p>
                )}
                <span className="font-semibold text-sm text-gray-500">
                  {movie.release_date?.slice(0, 4)}
                </span>
              </div>
            </div>

            {/* RIGHT: See more button */}
            <Link href={`/movieDetails/${movie.id}`}>
              <button
                // onClick={}
                className="flex-shrink-0 text-sm hover:cursor-pointer font-medium text-black hover:underline"
              >
                See more →
              </button>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="h-14 flex items-center border-t border-[#E4E4E7]">
        {results.length > 0 ? (
          <Link href={`/seeAllResults/${keyword}`}>
            <span className="pl-5 text-sm flex gap-2">
              See all results for
              <span className="font-semibold">"{keyword}"</span>
            </span>
          </Link>
        ) : (
          <div className="w-full text-center text-sm text-gray-500">
            No result
          </div>
        )}
      </div>
    </div>
  );
};
