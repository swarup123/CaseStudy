import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MAX_LENGTH } from "../../constant.type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormBoxWrapper } from "./partials/FormBoxWrapper";
import { getAPIURL, validateEmail } from "../../util";
import MuiButton from "../common/MuiButton";

const theme = createTheme();

export default function CreateUser() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate();

  const notify = (e: string) => toast.success(e);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserData({
      ...userData,
      [e.target.name]:
        e.target.name === "email"
          ? e.target.value
          : e.target.value.replace(/[^A-Za-z]/gi, ""),
    });
  }

  const handleUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let formData = {
        ...userData,
      };
      const URL = getAPIURL();
      let registerUser = await axios.post(`${URL}create-user`, formData);

      if (
        registerUser &&
        registerUser.status === 200 &&
        registerUser.data.statusCode !== 204
      ) {
        notify(
          `User created Successfully- ${registerUser.data.userDetails.firstName}`
        );
        navigate("/list-user");
      } else if (registerUser && registerUser.data.statusCode === 204) {
        notify(`Duplicate - ${registerUser.data.success}`);
      }
    } catch (err: any) {
      notify(err?.response?.data?.error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ToastContainer />
        <FormBoxWrapper>
          <Typography component="h1" variant="h5">
            Create User
          </Typography>
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  error={userData.firstName.length > MAX_LENGTH}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={userData.firstName}
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  error={userData.lastName.length > MAX_LENGTH}
                  label="Last Name"
                  name="lastName"
                  value={userData.lastName}
                  autoComplete="family-name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  error={
                    userData.email ? validateEmail(userData.email) : undefined
                  }
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <MuiButton handleClick={handleUser}>Create User</MuiButton>
          </Box>
        </FormBoxWrapper>
      </Container>
    </ThemeProvider>
  );
}
