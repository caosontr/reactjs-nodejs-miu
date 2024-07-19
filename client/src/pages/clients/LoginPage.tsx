import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, CircularProgress, Grid, Box } from '@mui/material';
import Swal from 'sweetalert2';
import { LoginForm } from '../../types/User';
import { login } from '../../services/auth';

interface ApiErrorResponse {
  response?: {
    data?: {
      message: string | string[];
    };
  };
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (formValue: LoginForm) => {
    setLoading(true);
    try {
      const res = await login(formValue);
      const accessToken = res.accessToken;
      window.sessionStorage.setItem('access-token', accessToken);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đăng Nhập Thành Công!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      const errorResponse = error as ApiErrorResponse;
      const errorMessages = errorResponse.response?.data?.message || 'Sai tài khoản hoặc mật khẩu!';

      Swal.fire({
        position: "center",
        icon: "error",
        title: Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
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
          Đăng Nhập
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            {...register('email', {
              required: 'Vui lòng nhập email!',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email không hợp lệ',
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
            label="Mật khẩu"
            fullWidth
            margin="normal"
            type="password"
            {...register('password', {
              required: 'Vui lòng nhập mật khẩu!',
              minLength: {
                value: 6,
                message: 'Mật khẩu phải dài ít nhất 6 ký tự',
              },
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
              <Link to="/register">
                <Typography variant="body2" color="primary">
                  Register Now
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng Nhập'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
