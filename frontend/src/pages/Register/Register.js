import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import brand_logo_no_bg from "../../images/logo_no_background.png";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Propolis.lb
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const [errMsg, setErrMsg] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    if (!username || !password || !firstName || !lastName || !email) {
      return setErrMsg(
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          Please fill all the above info
        </Alert>
      );
    }
    try {
      const response = await axios.post(
        "/auth/register",
        JSON.stringify({ firstName, lastName, email, username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response.data.token;
      sessionStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      // if (error.response.data?.status === 400) {
      //   return setErrMsg("Please fill all the above info!");
      // }

      if (Array.isArray(error.response.data)) {
        const stackErrors = (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {error.response.data.map((e) => {
              return (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                  {e.description}
                </Alert>
              );
            })}
          </Stack>
        );
        setErrMsg(stackErrors);
      } else if (typeof error.response.data?.errors === "object") {
        if (error.response.data?.errors?.Password) {
          setErrMsg(
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error.response.data?.errors?.Password}
            </Alert>
          );
        }
      } else {
        setErrMsg(
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            Please fill all the above info
          </Alert>
        );
      }
    }
  }

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            background: "linear-gradient(45deg, white,yellow)",
            color: "black",
            borderRadius: 4,
            boxShadow: "0 3px 10px 4px rgba(255, 215, 0, 0.5)",
            marginTop: 4,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={brand_logo_no_bg}
            sx={{ width: "66%", height: "66%" }}
          />
          <Typography component="h1" variant="h5">
            Sign Up for Free
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />{" "}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Sign Up
            </Button>
            {errMsg ? errMsg : null}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
