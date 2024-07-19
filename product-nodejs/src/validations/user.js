import Joi from "joi";

export const registerValid = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Vui lòng nhập tên người dùng",
    "any.required": "Tên người dùng là trường bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email phải có định dạng hợp lệ",
    "any.required": "Email là trường bắt buộc",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "any.required": "Mật khẩu là trường bắt buộc",
  }),
  avatar: Joi.string().optional().allow(""),
  role: Joi.string().default("member").optional().allow(""),
});

export const loginValid = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email phải có định dạng hợp lệ",
    "any.required": "Email là trường bắt buộc",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "any.required": "Mật khẩu là trường bắt buộc",
  }),
});
