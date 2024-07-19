import { Category } from "./Category";

export type Product = {
  _id: string;
  name: string;
  image: string;
  category: Category;
  price: number;
  brand: string;
  description: string;
};
export type ProductFormValue = {
  data: Product;

  name: string;
  image: string;
  category: string;
  price: number;
  brand: string;
  description: string;
};
