export interface Books {
  id: string;
  title: string;
  author: string;
  genre: string;
  publisher: string;
  price: number;
  pages: number;
  isInStock: boolean;
}

export interface BookFilters {
  title?: string;
  author?: string;
  genre?: string;
  isInStock?: boolean | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}
