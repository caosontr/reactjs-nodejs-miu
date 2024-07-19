import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProduct } from "../../services/product";
import { Container, CircularProgress, Grid, Typography } from "@mui/material";
import ProductNotFound from "./ProductNotFound";

const ProductDetail = () => {
  const { id } = useParams<{ id?: string }>();

  console.log("Product ID:", id); 

  const { data: product, isLoading,} = useQuery(
    ["product", id],
    () => (id ? getProduct(id) : Promise.resolve(null))
  );

  console.log("Product Data:", product); 
  

  if (isLoading) {
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

  if (!product) {
    return (
      <Container sx={{ mt: 6 }}>
        <ProductNotFound />
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={3}>
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={product.data.image}
              alt={product.data.name}
              className="product-image"
              style={{ maxWidth: "100%" }}
            />
          </Grid>
          <Grid item md={6}>
            <Typography variant="h2" className="product-title">
              {product.data.name}
            </Typography>
            <Typography variant="body1">
              <strong>Brand:</strong>{" "}
              <span className="product-info">{product.data.brand}</span>
            </Typography>
            <Typography variant="body1">
              <strong>Price:</strong>{" "}
              <span className="product-info">{product.data.price} VNĐ</span>
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong>{" "}
              <span className="product-info">{product.data.description}</span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetail;
