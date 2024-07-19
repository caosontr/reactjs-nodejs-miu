import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ContactsIcon from "@mui/icons-material/Contacts";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Link from "@mui/material/Link";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <img src="" alt="Logo" style={{ height: "40px" }} />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Link href="/" color="inherit" underline="none">
            <Button color="inherit" startIcon={<HomeIcon />}>
              Home
            </Button>
          </Link>
          <Link href="/product" color="inherit" underline="none">
            <Button color="inherit" startIcon={<LocalMallIcon />}>
              Product
            </Button>
          </Link>
          <Link href="/contact" color="inherit" underline="none">
            <Button color="inherit" startIcon={<ContactsIcon />}>
              Contact
            </Button>
          </Link>
          <Link href="/admin" color="inherit" underline="none">
            <Button color="inherit" startIcon={<AdminPanelSettingsIcon />}>
              Admin
            </Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/login" color="inherit" underline="none">
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Link>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
