import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function InputFormField({
  params,
  sendUpdatedValues,
  userPassword,
}) {
  const [fieldState, setFieldState] = useState(params);
  const handleOnChange = (event, input) => {
    sendUpdatedValues({ [input.name]: event.target.value });
    if (input.errorFunction) {
      const message = input.errorFunction(event.target.value, userPassword);
      // Update the specific input field if the function gets one par it will not crash it fixed for checking the password confirmation
      const updatedInput = {
        ...input,
        errorMessage: message,
      };
      setFieldState(updatedInput);
      event.target.setCustomValidity(message == " " ? "" : message);
    }
  };
  const handleOnChangeAutoComplete = (event, value, input) => {
    sendUpdatedValues({ [input.name]: value });
    if (input.errorFunction) {
      const message = input.errorFunction(value, userPassword);
      // Update the specific input field if the function gets one par it will not crash it fixed for checking the password confirmation
      const updatedInput = {
        ...input,
        errorMessage: message,
      };
      setFieldState(updatedInput);
      event.target.setCustomValidity(message == " " ? "" : message);
    }
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
    setFieldState(updatedInput);
  };
  return (
    <FormControl fullWidth={true} variant="outlined">
      <label htmlFor={fieldState.name} style={{ padding: " 5px 0 " }}>
        {fieldState.label}
        {fieldState.required && "*"}
      </label>
      {fieldState.autoCompleteList ? (
        <Autocomplete
          fullWidth={true}
          id={fieldState.name}
          options={fieldState.autoCompleteList}
          onChange={(event, value) =>
            handleOnChangeAutoComplete(event, value, fieldState)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              error={
                fieldState.errorMessage == " " ||
                fieldState.errorMessage == null
                  ? false
                  : true
              }
              required={fieldState.required}
              onChange={(event) => handleOnChange(event, fieldState)}
              placeholder={fieldState.label}
              fullWidth={true}
            />
          )}
        />
      ) : (
        <>
          <TextField
            id={fieldState.name}
            error={
              fieldState.errorMessage == " " || fieldState.errorMessage == null
                ? false
                : true
            }
            required={fieldState.required}
            onChange={(event) => handleOnChange(event, fieldState)}
            type={fieldState.type}
            variant="outlined"
            helperText={fieldState.errorMessage ?? " "}
            placeholder={fieldState.label}
            InputProps={{
              endAdornment: fieldState.endIconButton && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(event) =>
                      changeShowAndChangeType(event, fieldState)
                    }
                  >
                    {fieldState.endIconButton}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </>
      )}
    </FormControl>
  );
}
