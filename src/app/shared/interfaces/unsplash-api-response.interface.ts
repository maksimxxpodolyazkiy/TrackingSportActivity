export interface UnsplashApiResponse {
  results: Array<{
    urls: {
      full: string;
      raw: string;
      regular: string;
      small: string;
      thumb: string;
    };
  }>;
  total: number;
  total_pages: number;
}
