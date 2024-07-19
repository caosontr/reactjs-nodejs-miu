import express from "express";
import ProductController from "../controllers/product.js";
// import { verifyToken, checkUserInDB } from "../middlewares/checkPermission.js";
const router = express();

const productController = new ProductController();

router.get(`/products`, productController.getAllProducts);
router.get(`/products/:id`, productController.getProductDetail);
router.post(`/products`, productController.createProduct);
router.put(`/products/:id`, productController.updateProduct);
router.delete(`/products/:id`, productController.deleteProduct);
// router.post(`/products`, verifyToken, checkUserInDB, productController.createProduct);
// router.put(`/products/:id`, verifyToken, checkUserInDB, productController.updateProduct);
// router.delete(`/products/:id`, verifyToken, checkUserInDB, productController.deleteProduct);

export default router;
