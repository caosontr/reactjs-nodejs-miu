import Category from "../models/category.js";

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async getCategoryDetail(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }
      return res.status(200).json({
        message: "Lấy chi tiết danh mục thành công",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }
      return res.status(201).json({
        message: "Danh mục được thêm thành công",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteCategory(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }
      return res.status(200).json({
        message: "Danh mục được xóa thành công",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async updateCategory(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy",
        });
      }
      return res.status(200).json({
        message: "Danh mục được sửa thành công",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default CategoryController;
