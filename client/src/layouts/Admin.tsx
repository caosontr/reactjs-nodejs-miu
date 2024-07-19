import { Box, Container, Typography } from '@mui/material';
import SideBar from "../components/admin/SideBar";

const AdminPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the Admin Page
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPage;
