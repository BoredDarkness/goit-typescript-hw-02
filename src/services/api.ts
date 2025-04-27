import axios from "axios";

export interface RawImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

export interface Image {
  id: string;
  thumbnail: string;
  full: string;
  tags: string;
}

const BASE_URL = import.meta.env.VITE_PIXABAY_URL
  ? String(import.meta.env.VITE_PIXABAY_URL)
  : "https://pixabay.com/api";
const API_KEY = "44213256-a0da22d27c0a561a4a975a94d";

export async function fetchImages(query: string, page: number) {
  const { data } = await axios.get<{ hits: RawImage[] }>(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      per_page: 12,
      page,
    },
  });
  return data.hits.map((item) => ({
    id: String(item.id),
    thumbnail: item.webformatURL,
    full: item.largeImageURL,
    tags: item.tags,
  }));
}
