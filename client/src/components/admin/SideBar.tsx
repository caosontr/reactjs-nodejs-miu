import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { ListAlt, People } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div>
        <List>
          <ListItem
            component={Link}
            to="/admin"
            button
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
          >
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            component={Link}
            to="/admin/products"
            button
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
          >
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Product List" />
          </ListItem>
          <ListItem
            component={Link}
            to="/admin/users"
            button
            sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.08)" } }}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="User List" />
          </ListItem>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
