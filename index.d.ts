export type Movie = {
  id: number;
  runtime: number;
  vote_count: number;
  backdrop_path: string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  original_title: string;
  genres: { id: number; name: string }[];
};
export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};
export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
};
