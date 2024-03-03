import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { passwordValidation, userNameValidation } from "../utils/validatoin";
import InputFormField from "../components/InputFormField";
import { showContext } from "../App";
import { load_user_session } from "../utils/loadUserSesion";
import { toast } from "sonner";
import LockOpenIcon from "@mui/icons-material/LockOpen";
export default function LoginPage() {
  const setShowPage = useContext(showContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });

  const loginUser = (event) => {
    event.preventDefault();
    try {
      load_user_session(userInfo);
      setShowPage("profile");
    } catch (error) {
      toast.error(error.message);
    }
    event.target.reset();
  };
  // inputs state for the inputs in the page used for the validation and the rendering
  const inputs = [
    {
      id: 1,
      label: "Username",
      name: "username",
      type: "text",
      required: true,
      errorFunction: (value) => userNameValidation(value),
      startIcon: <PersonIcon />,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      errorFunction: (value) => passwordValidation(value),
      startIcon: <VpnKeyIcon />,
      endIconButton: <VisibilityIcon />,
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form
          action=""
          style={{
            width: "500px",
            boxShadow: "0 0 10px black",
            padding: "50px",
            borderRadius: "5px",
            backgroundColor: "rgba(250,250,250,0.7)",
          }}
          onSubmit={loginUser}
        >
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Avatar
              align="center"
              style={{
                width: 60,
                height: 60,
                backgroundColor: "skyblue",
              }}
            >
              <LockOpenIcon />
            </Avatar>
            <Typography variant="h4" fontWeight={600} align="center">
              Login page
            </Typography>
          </Stack>
          <br />
          <br />
          <Grid container spacing={2}>
            {inputs.map((elm) => (
              <Grid
                item
                xs={12}
                md={12}
                key={elm.id}
                flex={true}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                {" "}
                <InputFormField
                  params={elm}
                  errorFunction={
                    userInfo.username == "admin" ? null : elm.errorFunction
                  }
                  userPassword={userInfo.password}
                  sendUpdatedValues={(value) =>
                    setUserInfo((prev) => ({ ...prev, ...value }))
                  }
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth={true}
              >
                Sign in
              </Button>
              <Typography variant="caption">
                Create new account{" "}
                <span
                  style={{
                    color: "#1976d2",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPage("register")}
                >
                  Sign up
                </span>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
