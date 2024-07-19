import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import { Category } from "../../../types/Category";
import { deleteCategory, getCategories } from "../../../services/category";

export default function CategoryListPage() {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(
    null
  );

  const result = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = result.data || [];
  const loading = result.isLoading;

  const handleDelete = (id: string) => {
    setCategoryIdToDelete(id);
    setOpenModalConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryIdToDelete) {
      await deleteCategory(categoryIdToDelete);
      setCategoryIdToDelete(null);
      setOpenModalConfirm(false);
      result.refetch();
    }
  };

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
    <Container sx={{ mt: 6 }}>
      
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>
      <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
        <Grid item>
          <Button
            component={Link}
            to={"/"}
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to={"/admin/add-product"}
            variant="contained"
            color="success"
          >
            Add Product
          </Button>
        </Grid>
      </Grid>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>#ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category: Category) => (
              <TableRow key={category._id}>
                <TableCell>{category._id}</TableCell>
                <TableCell>{category.name}</TableCell>
                
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/admin/edit-product/${category._id}`}
                    variant="contained"
                    color="info"
                    sx={{ mr: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModalConfirm} onClose={() => setOpenModalConfirm(false)}>
        <Container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Bạn có chắc muốn xóa?
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenModalConfirm(false)}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmDelete}
          >
            Confirm
          </Button>
        </Container>
      </Modal>
    </Container>
  );
}
