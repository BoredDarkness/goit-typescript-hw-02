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

const API_KEY = "44213256-a0da22d27c0a561a4a975a94d";
const BASE_URL = "https://pixabay.com/api";

export async function fetchImages(
  query: string,
  page: number
): Promise<Image[]> {
  const response = await axios.get<{ hits: RawImage[] }>(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      per_page: 12,
      page,
    },
  });

  return response.data.hits.map(
    ({ id, webformatURL, largeImageURL, tags }) => ({
      id: id.toString(),
      thumbnail: webformatURL,
      full: largeImageURL,
      tags,
    })
  );
}
