import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { getProduct, updateProduct } from "../../../services/product";
import { ProductFormValue } from "../../../types/Product";

const ProductEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormValue>();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    const fetchProduct = async () => {
      try {
        const product = await getProduct(id);
        setValue("name", product.data.name);
        setValue("image", product.data.image);
        setValue("price", product.data.price);
        setValue("brand", product.data.brand);
        setValue("description", product.data.description);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (formValue: ProductFormValue) => {
    setSaving(true);
    try {
      await updateProduct(id!, formValue);
      setSaving(false);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Product
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

export default ProductEditForm;
