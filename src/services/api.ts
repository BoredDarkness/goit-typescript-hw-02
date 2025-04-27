import axios from "axios";

export interface RawPhoto {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string | null;
}

export interface Photo {
  urls: any;
  tags: string | undefined;
  id: string;
  thumbnail: string;
  full: string;
  description: string;
}

const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "kZt3B-JJhRTnGAAid1ALP1CjftogQ-sa63nBeDkcWEg";
const PER_PAGE = 12;

export async function fetchPhotos(
  query: string,
  page: number
): Promise<Photo[]> {
  const { data } = await axios.get<{ results: RawPhoto[] }>(UNSPLASH_API_URL, {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: PER_PAGE,
    },
  });

  return data.results.map((item) => ({
    id: item.id,
    thumbnail: item.urls.small,
    full: item.urls.full,
    description: item.alt_description ?? "No description",
    urls: item.urls,
    tags: undefined,
  }));
}
