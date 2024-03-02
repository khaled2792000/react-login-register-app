import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { loadUsers, showContext } from "../../App";
import EditDetails from "./EditDetails";

export default function SystemAdmin({ setShowPage }) {
  const [userToEdit, setUserToEdit] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [users, setUsers] = useState(
    loadUsers().filter((user) => user.username != "admin")
  );

  const logoutUser = () => {
    sessionStorage.clear();
    setShowPage("login");
  };
  function updateList(updatedValues) {
    const allTheUserWithoutTargetUser = users.filter(
      (user) => user.email != updatedValues.email
    );
    setUserToEdit(null);
    setUsers([...allTheUserWithoutTargetUser, updatedValues]);
  }
  function deleteUser(userToDelete) {
    const remainingData = JSON.stringify(
      users.filter((user) => user.username != userToDelete.username)
    );
    localStorage.setItem("users", remainingData);
    setUsers(
      JSON.parse(localStorage.getItem("users")).filter(
        (user) => user.username != "admin"
      )
    );
    setUserToEdit(null);
  }

  return (
    <>
      <Paper
        style={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Admin page
          </Typography>
          {users.length == 0 ? (
            <Typography variant="h6">No users in the system</Typography>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Table style={{ width: "80vw" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Birth Day</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={user.userImage}
                            alt=""
                            onError={(e) => {
                              e.target.src =
                                "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
                            }}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <p style={{ marginLeft: "10px" }}>{user.username}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.firstName}, {user.lastName}
                      </TableCell>
                      <TableCell>{user.birthday}</TableCell>
                      <TableCell>
                        {user.roadName} {user.houseNumber}, {user.city}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              setShowEdit((prev) => !prev);
                              setUserToEdit(user);
                            }}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => deleteUser(user)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
          <Button
            onClick={logoutUser}
            style={{ marginTop: "20px" }}
            variant="contained"
            color="secondary"
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </div>
      </Paper>
      {showEdit && (
        <EditDetails UserDetails={userToEdit} sendUpdatedUser={updateList} />
      )}
    </>
  );
}
