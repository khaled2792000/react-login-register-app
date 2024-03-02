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
  errorFunction,
  userToEdit,
}) {
  const [fieldState, setFieldState] = useState(params);
  const handleOnChange = (event, input) => {
    sendUpdatedValues({ [input.name]: event.target.value });
    if (errorFunction) {
      const message = errorFunction(event.target.value, userPassword);
      // Update the specific input field if the function gets one par it will not crash it fixed for checking the password confirmation
      const updatedInput = {
        ...input,
        errorMessage: message,
      };
      setFieldState(updatedInput);
      event.target.setCustomValidity(message === " " ? "" : message);
    } else {
      event.target.setCustomValidity("");
      setFieldState({
        ...input,
        errorMessage: null,
      });
    }
  };
  function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  const handleOnChangeAutoComplete = (event, value, input) => {
    sendUpdatedValues({ [input.name]: value });
    if (errorFunction) {
      const message = errorFunction(value, userPassword);
      // Update the specific input field if the function gets one par it will not crash it fixed for checking the password confirmation
      const updatedInput = {
        ...input,
        errorMessage: message,
      };
      setFieldState(updatedInput);
      // event.target.setCustomValidity(message == " " ? "" : message);
    } else {
      // event.target.setCustomValidity("");
      setFieldState({
        ...input,
        errorMessage: null,
      });
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
          name={fieldState.name}
          defaultValue={userToEdit && userToEdit[fieldState.name]}
          options={fieldState.autoCompleteList}
          onChange={(event, value) =>
            handleOnChangeAutoComplete(event, value, fieldState)
          }
          renderInput={(params) => (
            <TextField
              name={fieldState.name}
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
              defaultValue={userToEdit && userToEdit[fieldState.name]}
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
            name={fieldState.name}
            required={fieldState.required}
            onChange={(event) => handleOnChange(event, fieldState)}
            onFocus={(event) => handleOnChange(event, fieldState)}
            type={fieldState.type}
            variant="outlined"
            helperText={fieldState.errorMessage ?? " "}
            placeholder={fieldState.label}
            defaultValue={
              userToEdit && fieldState.type != "file"
                ? userToEdit[fieldState.name]
                : null
            }
            InputProps={{
              accept: fieldState.accept,
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
