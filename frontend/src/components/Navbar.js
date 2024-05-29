import React, { useState } from "react";
import "./navbar.css";
import HiveIcon from "@mui/icons-material/Hive";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router-dom";
import brand_logo from "../images/three_hives_logo.png";
import useUser from "../hooks/useUser";
import MenuOptions from "./MenuOptions";
import isTokenExpired from "../helpers/isTokenExpired";
import Badge from "@mui/material/Badge";

function Navbar() {
  const location = useLocation();
  const user = useUser();
  var userOption;
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(!isRotating);
  };
  if (!isTokenExpired() && user) {
    userOption = (
      <ul className="custom-navbar-cta navbar-nav">
        <li className="nav-link collapse navbar-collapse" id="navbarsFurni">
          <MenuOptions />
          <Tooltip title="My Cart">
            <a href="/cart">
              <Badge badgeContent={0} color="error">
                <ShoppingCartOutlinedIcon fontSize="large" color="warning" />
              </Badge>
            </a>
          </Tooltip>
        </li>
      </ul>
    );
  } else {
    userOption = (
      <ul className="custom-navbar-cta navbar-nav">
        <li className="nav-link collapse navbar-collapse" id="navbarsFurni">
          <Button
            variant="outlined"
            size="small"
            color="warning"
            href="/register"
            endIcon={<PersonAddIcon fontSize="small" />}
            sx={{ marginRight: "13px" }}
          >
            Sign up
          </Button>

          <Button
            variant="contained"
            size="small"
            color="warning"
            href="/login"
            endIcon={<LoginIcon fontSize="small" />}
            sx={{ marginRight: "25px" }}
          >
            Log in
          </Button>
          <Tooltip title="My Cart">
            <a href="/cart">
              <Badge badgeContent={0} color="error">
                <ShoppingCartOutlinedIcon fontSize="large" color="warning" />
              </Badge>
            </a>
          </Tooltip>
        </li>
      </ul>
    );
  }
  // console.log(user);
  return (
    <div>
      <nav
        className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
        arial-label="Furni navigation bar"
        id="home"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={brand_logo} alt="brand logo" className="brand-logo" />
            Propolis<span>.</span>lb
          </a>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav mb-2 mb-md-0">
              <li
                className={
                  location.pathname === "/" ? "nav-item active" : "nav-item"
                }
              >
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li
                className={
                  location.pathname === "/products"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <a className="nav-link" href="/products">
                  Products
                </a>
              </li>
              <li
                onClick={() => {
                  location.pathname !== "/" &&
                    localStorage.setItem("scrollToFeatured", "yes");
                }}
              >
                <a className="nav-link" href="/#featured">
                  Featured
                </a>
              </li>
              <li
                onClick={() => {
                  localStorage.setItem("scrollToFaq", "yes");
                }}
              >
                <a className="nav-link" href="/#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="nav-link" href="/contactus">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          {userOption}
          <Tooltip title="Options">
            <Button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsFurni"
              aria-controls="navbarsFurni"
              aria-expanded="false"
              aria-label="Toggle navigation"
              variant="outlined"
              color="warning"
              onClick={handleClick}
            >
              <HiveIcon
                color="warning"
                fontSize="medium"
                className={isRotating ? "rotate-icon" : ""}
              />
            </Button>
          </Tooltip>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
