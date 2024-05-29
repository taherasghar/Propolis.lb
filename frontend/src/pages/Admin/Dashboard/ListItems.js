import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
// import AssignmentIcon from "@mui/icons-material/Assignment";
import HiveIcon from "@mui/icons-material/Hive";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Divider } from "@mui/material";

function ListItems() {
  const location = useLocation();

  const getActiveStyle = (path) => {
    return location.pathname === path ? { backgroundColor: "#ffA500" } : {};
  };

  return (
    <React.Fragment>
      <ListItemButton
        component={Link}
        to="/dashboard"
        style={getActiveStyle("/dashboard")}
        sx={{
          "&:hover": {
            backgroundColor: "#ffA500",
          },
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/dashboard/orders"
        style={getActiveStyle("/dashboard/orders")}
        sx={{
          "&:hover": {
            backgroundColor: "#ffA500",
          },
        }}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/dashboard/products"
        style={getActiveStyle("/dashboard/products")}
        sx={{
          "&:hover": {
            backgroundColor: "#ffA500",
          },
        }}
      >
        <ListItemIcon>
          <HiveIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/dashboard/customers"
        style={getActiveStyle("/dashboard/customers")}
        sx={{
          "&:hover": {
            backgroundColor: "#ffA500",
          },
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
      <Divider sx={({ my: 1 }, { background: "orange" })} />

      {/* <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton> */}
    </React.Fragment>
  );
}

export default ListItems;
