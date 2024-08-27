export interface Category {
  id: number;
  text: string;
  productCount?: number;
  deletedAt?: string | null; // ISO 8601 format or null
  createdAt?: string; // ISO 8601 format
  updatedAt?: string; // ISO 8601 format
}
