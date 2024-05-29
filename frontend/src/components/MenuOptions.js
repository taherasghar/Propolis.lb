import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import useUser from "../hooks/useUser";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { useNavigate } from "react-router-dom";
import isTokenExpired from "../helpers/isTokenExpired";
import DashboardIcon from "@mui/icons-material/Dashboard";

function MenuOptions() {
  const user = useUser();
  const navigate = useNavigate();
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            sx={{ marginRight: "20px" }}
            variant="contained"
            {...bindTrigger(popupState)}
            endIcon={<PersonOutlineIcon />}
            color="warning"
          >
            Hello {user.firstName}!
          </Button>
          <Menu {...bindMenu(popupState)}>
            {user.role === "Admin" && !isTokenExpired() && (
              <MenuItem onClick={popupState.close} >
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    textAlign: "left", // Ensure text is aligned to the start
                    marginRight: "20px",
                  }}
                  {...bindTrigger(popupState)}
                  endIcon={<DashboardIcon />}
                  color="warning"
                  fullWidth
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              </MenuItem>
            )}
            <MenuItem onClick={popupState.close}>
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left", // Ensure text is aligned to the start
                  marginRight: "20px",
                }}
                {...bindTrigger(popupState)}
                endIcon={<CreditCardRoundedIcon />}
                color="warning"
                fullWidth
                onClick={() => navigate("/orders-history")}
              >
                Orders
              </Button>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left", // Ensure text is aligned to the start
                  marginRight: "20px",
                }}
                {...bindTrigger(popupState)}
                endIcon={<LogoutRoundedIcon />}
                color="warning"
                fullWidth
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default MenuOptions;
