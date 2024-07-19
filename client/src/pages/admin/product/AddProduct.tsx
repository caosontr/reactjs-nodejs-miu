import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { createProduct } from "../../../services/product";
import { ProductFormValue } from "../../../types/Product";

const ProductAddForm = () => {
  const useFormResult = useForm<ProductFormValue>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormResult;

  const [saving, setSaving] = useState<boolean>(false);

  const onSubmit = async (formValue: ProductFormValue) => {
    setSaving(true);

    try {
      await createProduct(formValue);
      setSaving(false);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            {...register("name", {
              required: "Trường này không được bỏ trống!",
              minLength: {
                value: 5,
                message: "Số lượng ký tự tối thiểu là 5",
              },
              maxLength: {
                value: 255,
                message: "Số lượng ký tự tối đa là 255",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image - URL"
            {...register("image", {
              required: "Trường này không được bỏ trống!",
            })}
            error={!!errors.image}
            helperText={errors.image?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Brand"
            {...register("brand", {
              required: "Trường này không được bỏ trống!",
            })}
            error={!!errors.brand}
            helperText={errors.brand?.message}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            type="number"
            {...register("price", {
              required: "Trường này không được bỏ trống!",
              min: {
                value: 1,
                message: "Giá phải lớn hơn 0",
              },
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={4}
            {...register("description", {
              required: "Trường này không được bỏ trống!",
              minLength: {
                value: 20,
                message: "Số lượng ký tự tối thiểu là 20",
              },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Button
            disabled={saving}
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProductAddForm;
