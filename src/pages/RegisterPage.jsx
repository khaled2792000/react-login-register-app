import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import HomeIcon from "@mui/icons-material/Home";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  JustPositiveNumber,
  ageRangeValidation,
  confirmPasswordValidList,
  emailValidation,
  hebrewValidation,
  nameStringValidation,
  passwordValidation,
  userNameValidation,
} from "../utils/validatoin";
import InputFormField from "../components/InputFormField";
import { showContext } from "../App";
import { add_user_to_local_storage } from "../utils/addUserToLocalStorage";

// handel the register form submit event
export default function RegisterPage() {
  const setShowPage = useContext(showContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    userImage: "",
    firstName: "",
    lastName: "",
    city: "",
    roadName: "",
    houseNumber: "",
  });

  const registerUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const adjusted_data = Object.fromEntries(data.entries());
    adjusted_data.userImage = URL.createObjectURL(adjusted_data.userImage);
    try {
      add_user_to_local_storage(adjusted_data);
      setShowPage("login");
      event.target.reset();
      setUserInfo(null);
    } catch (error) {
      console.log(error.message);
    }
  };
  // inputs state for the inputs in the page used for the validation and the rendering
  const inputs = [
    {
      id: 1,
      label: "Username",
      name: "username",
      type: "text",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      errorFunction: (value) => userNameValidation(value),
      startIcon: <PersonIcon />,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
      errorFunction: (value) => passwordValidation(value),
      startIcon: <VpnKeyIcon />,
      endIconButton: <VisibilityIcon />,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      required: true,
      errorFunction: (value1, value2) =>
        confirmPasswordValidList(value1, value2),
      startIcon: <VpnKeyIcon />,
      endIconButton: <VisibilityIcon />,
    },
    {
      id: 4,
      name: "userImage",
      type: "file",
      accept: "image/jpg,image/jpeg",
      label: "Upload your Image",
      startIcon: " ",
    },
    {
      id: 5,
      type: "text",
      pattern: `^[A-Za-z]+$`,
      label: "First name",
      name: "firstName",
      required: true,
      errorFunction: (value) => nameStringValidation(value),
      startIcon: <DriveFileRenameOutlineIcon />,
      haveFile: false,
    },
    {
      id: 6,
      name: "lastName",
      type: "text",
      pattern: `^[A-Za-z]+$`,
      label: "Last name",
      errorFunction: (value) => nameStringValidation(value),
      startIcon: <DriveFileRenameOutlineIcon />,
      required: true,
    },
    {
      id: 7,
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      errorFunction: (value) => emailValidation(value),
      startIcon: <EmailIcon />,
    },
    {
      id: 8,
      name: "birthday",
      type: "date",
      label: "Birthday",
      errorFunction: (value) => ageRangeValidation(value),
      startIcon: <CakeIcon />,
    },
    {
      id: 9,
      name: "city",
      type: "text",
      label: "City",
      autoCompleteList: ["גת", "באקה", "חדרה", "חריש", "חיפה"],
      listId: "cites",
      required: true,
      startIcon: <ApartmentIcon />,
    },
    {
      id: 10,
      name: "roadName",
      type: "text",
      label: "Road Name",
      errorFunction: (value) => hebrewValidation(value),
      startIcon: <EditRoadIcon />,
    },
    {
      id: 11,
      name: "houseNumber",
      type: "number",
      label: "HouseNumber",
      pattern: "^\\d*$",
      errorFunction: (value) => JustPositiveNumber(value),
      required: true,
      startIcon: <HomeIcon />,
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
          style={{
            width: "800px",
            boxShadow: "0 0 10px black",
            padding: "50px",
            borderRadius: "5px",
            backgroundColor: "rgba(250,250,250,0.7)",
          }}
          onSubmit={registerUser}
        >
          <Typography variant="h4" align="center">
            Register page
          </Typography>
          <br />
          <br />
          <Grid container spacing={2}>
            {inputs.map((elm) => (
              <Grid
                item
                xs={12}
                md={4}
                key={elm.id}
                flex={true}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                {" "}
                <InputFormField
                  params={elm}
                  errorFunction={elm.errorFunction}
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
                Sign up
              </Button>
              <Typography variant="caption">
                I have an account{" "}
                <span
                  style={{
                    color: "#1976d2",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPage("login")}
                >
                  Sign in
                </span>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
