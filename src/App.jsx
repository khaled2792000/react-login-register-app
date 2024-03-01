import React from "react";

function App() {
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      pattern: user.password,
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
    },
    {
      id: 4,
      name: "userImage",
      type: "file",
      placeholder: "Image",
      accept: "image/jpg,image/jpeg",
      label: "Upload your Image",
    },
    {
      id: 5,
      type: "text",
      placeholder: "FirstName",
      pattern: `^[A-Za-z]+$`,
      label: "First name",
      required: true,
    },
    {
      id: 6,
      name: "lastName",
      type: "text",
      placeholder: "LastName",
      pattern: `^[A-Za-z]+$`,
      label: "Last name",
      required: true,
    },
    {
      id: 7,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 8,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 9,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      listId: "cites",
      list: cites,
    },
    {
      id: 10,
      name: "roadName",
      type: "text",
      placeholder: "Road Name",
      label: "Road Name",
    },
    {
      id: 11,
      name: "houseNumber",
      type: "number",
      placeholder: "HouseNumber",
      label: "HouseNumber",
      pattern: "^\\d*$",
      required: true,
    },
  ];
  return;
  <></>;
}

export default App;
