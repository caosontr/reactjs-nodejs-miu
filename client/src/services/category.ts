import sleep from '../ultis/sleep'
import { Product, ProductFormValue } from '../types/Product'
import axiosInstance from '../config/axiosInstance'
import { Category } from '../types/Category'

const getCategories = async (): Promise<Category[]> => {
  await sleep()
  const response = await axiosInstance.get('/categories')
  return response.data
}

const updateProduct = async (_id: string, newValue: ProductFormValue): Promise<Product> => {
  await sleep()
  const response = await axiosInstance.put(`/products/${_id}`, newValue)
  return response.data
}

const createProduct = async (formValue: ProductFormValue): Promise<Product> => {
  await sleep()
  const response = await axiosInstance.post('/products', formValue)
  return response.data
}

const deleteCategory = async (_id: string): Promise<void> => {
  await sleep()
  await axiosInstance.delete(`/categories/${_id}`)
}

export { getCategories, updateProduct, createProduct, deleteCategory }
