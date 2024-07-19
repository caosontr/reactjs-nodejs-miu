import Product from "../models/product.js";

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getProductDetail(req, res) {
    try {
      const product = await Product.findById(req.params.id).populate([
        "category",
      ]);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy!",
        });
      }
      return res.status(200).json({
        message: "Lấy chi tiết sản phẩm thành công!",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy!",
        });
      }
      return res.status(201).json({
        message: "Sản phẩm được thêm thành công!",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy!",
        });
      }
      return res.status(200).json({
        message: "Sản phẩm được xóa thành công!",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy!",
        });
      }
      return res.status(200).json({
        message: "Sản phẩm được sửa thành công!",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
export default ProductController;
