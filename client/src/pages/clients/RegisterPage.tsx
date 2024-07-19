import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import { RegisterForm } from "../../types/User";
import { register as registerUser } from "../../services/auth";
import { AxiosError } from "axios";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formValue: RegisterForm) => {
    setLoading(true);
    try {
      await registerUser(formValue);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công",
        text: "Bạn đã đăng ký thành công! Hãy đăng nhập để tiếp tục.",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      setLoading(false);
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const { status, data } = axiosError.response;
        const message =
          (data as { message?: string }).message ||
          "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.";

        if (status === 400 && message === "Email đã được đăng ký") {
          Swal.fire({
            icon: "error",
            title: "Đăng ký thất bại",
            text: "Email đã được đăng ký. Vui lòng sử dụng email khác.",
          });
        } else if (status === 400) {
          Swal.fire({
            icon: "error",
            title: "Đăng ký thất bại",
            text: message,
          });
        }
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={5}
        p={3}
        sx={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Đăng Ký
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Tên người dùng"
            {...register("username", {
              required: "Trường này không được bỏ trống!",
              minLength: {
                value: 6,
                message: "Số lượng ký tự tối thiểu là 6",
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{
              mb: 2,
              "& .MuiInputBase-input": {
                padding: "12px 14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ddd",
                },
                "&:hover fieldset": {
                  borderColor: "#0056b3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0056b3",
                },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register("email", {
              required: "Trường này không được bỏ trống!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Địa chỉ email không hợp lệ",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              mb: 2,
              "& .MuiInputBase-input": {
                padding: "12px 14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ddd",
                },
                "&:hover fieldset": {
                  borderColor: "#0056b3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0056b3",
                },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Mật khẩu"
            {...register("password", {
              required: "Trường này không được bỏ trống!",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              mb: 2,
              "& .MuiInputBase-input": {
                padding: "12px 14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ddd",
                },
                "&:hover fieldset": {
                  borderColor: "#0056b3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0056b3",
                },
              },
            }}
          />
          <Grid container spacing={2} mt={2}>
            <Grid item xs>
              <Link to="/login">
                <Typography variant="body2" color="primary">
                  Login Now
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: "#0056b3",
                  "&:hover": {
                    backgroundColor: "#003d7a",
                  },
                  transition: "background-color 0.3s",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Đăng Kí"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
