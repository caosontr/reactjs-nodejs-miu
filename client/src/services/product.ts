import sleep from "../ultis/sleep";
import { Product, ProductFormValue } from "../types/Product";
import axiosInstance from "../config/axiosInstance";

const getProducts = async (): Promise<Product[]> => {
  await sleep();
  const response = await axiosInstance.get("/products");
  return response.data;
};

const getProduct = async (_id: string): Promise<ProductFormValue> => {
  await sleep();
  const response = await axiosInstance.get("/products/" + _id);
  return response.data;
};

const updateProduct = async (
  _id: string,
  newValue: ProductFormValue
): Promise<Product> => {
  await sleep();
  const response = await axiosInstance.put(`/products/${_id}`, newValue);
  return response.data;
};

const createProduct = async (formValue: ProductFormValue): Promise<Product> => {
  await sleep();
  const response = await axiosInstance.post("/products", formValue);
  return response.data;
};

const deleteProduct = async (_id: string): Promise<void> => {
  await sleep();
  await axiosInstance.delete(`/products/${_id}`);
};

export { getProducts, getProduct, updateProduct, createProduct, deleteProduct };
