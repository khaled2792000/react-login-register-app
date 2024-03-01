import { AccountCircle, Balance, Visibility } from "@mui/icons-material";
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
import React, { useState } from "react";

// handel the register form submit event
export default function RegisterPage() {
  const handleOnChange = (event, input) => {
    // Update the specific input field
    const updatedInput = { ...input, error: true };
    // update the inputs list
    const updatedInputs = inputs.map((elm) =>
      elm.id === input.id ? updatedInput : elm
    );
    setInputs(updatedInputs);
  };
  // object holds the password icon status
  const showMap = {
    text: <VisibilityOffIcon />,
    password: <VisibilityIcon />,
  };
  // function to change the password status when click the eye
  const changeShowAndChangeType = (event, input) => {
    const inputType = input.type;
    const isItText = inputType == "text";
    const updatedInput = {
      ...input,
      endIconButton: showMap[isItText ? "password" : "text"],
      type: isItText ? "password" : "text",
    };
    setInputs((prev) =>
      prev.map((elm) => (elm.id === input.id ? updatedInput : elm))
    );
  };

  const [inputs, setInputs] = useState([
    {
      id: 1,
      label: "Username",
      name: "username",
      type: "text",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
      startIcon: <PersonIcon />,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
      startIcon: <VpnKeyIcon />,
      endIconButton: <VisibilityIcon />,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      required: true,
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
      required: true,
      startIcon: <DriveFileRenameOutlineIcon />,
      haveFile: false,
    },
    {
      id: 6,
      name: "lastName",
      type: "text",
      pattern: `^[A-Za-z]+$`,
      label: "Last name",
      startIcon: <DriveFileRenameOutlineIcon />,
      required: true,
    },
    {
      id: 7,
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      startIcon: <EmailIcon />,
    },
    {
      id: 8,
      name: "birthday",
      type: "date",
      label: "Birthday",
      startIcon: <CakeIcon />,
    },
    {
      id: 9,
      name: "city",
      type: "text",
      label: "City",
      autoCompleteList: ["khaled", "khalaf"],
      listId: "cites",
      startIcon: <ApartmentIcon />,
    },
    {
      id: 10,
      name: "roadName",
      type: "text",
      label: "Road Name",
      startIcon: <EditRoadIcon />,
    },
    {
      id: 11,
      name: "houseNumber",
      type: "number",
      label: "HouseNumber",
      pattern: "^\\d*$",
      required: true,
      startIcon: <HomeIcon />,
    },
  ]);
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
            width: "800px",
            boxShadow: "0 0 10px black",
            padding: "50px",
            borderRadius: "5px",
            backgroundColor: "rgba(250,250,250,0.7)",
            overflow: "scroll",
          }}
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
                {/* Move the key to the Grid item */}
                <FormControl fullWidth={true} variant="outlined">
                  <label htmlFor={elm.name} style={{ padding: " 5px 0 " }}>
                    {elm.label}
                    {elm.required && "*"}
                  </label>
                  {elm.autoCompleteList ? (
                    <Autocomplete
                      fullWidth={true}
                      id={elm.name}
                      options={elm.autoCompleteList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={elm.error ?? false}
                          required={elm.required}
                          onChange={(event) => handleOnChange(event, elm)}
                          placeholder={elm.label}
                          fullWidth={true}
                        />
                      )}
                    />
                  ) : (
                    <>
                      <TextField
                        id={elm.name}
                        error={elm.error ?? false}
                        required={elm.required}
                        onChange={(event) => handleOnChange(event, elm)}
                        type={elm.type}
                        variant="outlined"
                        helperText={elm.error ? elm.errorMessage : " "}
                        placeholder={elm.label}
                        InputProps={{
                          endAdornment: elm.endIconButton && (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={(event) =>
                                  changeShowAndChangeType(event, elm)
                                }
                              >
                                {elm.endIconButton}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </>
                  )}
                </FormControl>
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
