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
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { loadUsers, showContext } from "../../App";
import EditDetails from "./EditDetails";

export default function SystemAdmin({ setShowPage }) {
  const [userToEdit, setUserToEdit] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);
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
    setShowEditPage(false);
  }
  function stringAvatar(name) {
    return {
      children: name[0],
    };
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
                          <div
                            className="profile-image"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Avatar
                              sx={{
                                backgroundColor: "skyblue",
                              }}
                              src={user.userImage}
                              {...stringAvatar(user.username)}
                            ></Avatar>
                          </div>
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
                              // setShowEdit((prev) => !prev);
                              setUserToEdit(user);
                              setShowEditPage((prev) => !prev);
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
      {showEditPage && (
        <EditDetails UserDetails={userToEdit} sendUpdatedUser={updateList} />
      )}
    </>
  );
}
