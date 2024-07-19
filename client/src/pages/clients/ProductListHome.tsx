import { FC } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";
import { getProducts } from "../../services/product";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Product } from "../../types/Product";

const ProductListHome: FC<Product> = () => {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = result.data || [];
  const loading = result.isLoading;
  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 6 }}>
        Sản phẩm mới nhất
      </Typography>
      <Grid container spacing={6}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <Link
                to={"/products/" + product._id}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Brand: {product.brand}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.price} VNĐ
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductListHome;
