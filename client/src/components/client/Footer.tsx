import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <AppBar position="static" color="primary" sx={{ marginTop: 'auto' }}>
      <Toolbar>
        <Typography variant="body1" color="inherit" sx={{ flexGrow: 1 }}>
          &copy; 2024 My Website. All rights reserved.
        </Typography>
        <Link href="#" color="inherit" sx={{ textDecoration: 'none', mr: 2 }}>
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" sx={{ textDecoration: 'none' }}>
          Terms of Service
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
