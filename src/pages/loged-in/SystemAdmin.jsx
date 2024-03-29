import React, { useState } from "react";
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
import { loadUsers } from "../../App";
import EditDetails from "./EditDetails";
import { toast } from "sonner";
export default function SystemAdmin({ setShowPage }) {
  // used for holding the user to edit values to show as default in the form
  const [userToEdit, setUserToEdit] = useState(null);
  // show the edit component or not
  const [showEditPage, setShowEditPage] = useState(false);
  // set the users list ot all the users except the admin to map it in the screen
  const [users, setUsers] = useState(
    loadUsers().filter((user) => user.username != "admin")
  );
  // logout user by clearing session storage
  const logoutUser = () => {
    sessionStorage.clear();
    setShowPage("login");
  };
  // update the users list to map it again
  function updateList(updatedValues) {
    const allTheUserWithoutTargetUser = users.filter(
      (user) => user.email != updatedValues.email
    );
    setUserToEdit(null);
    setShowEditPage(false);
    setUsers([...allTheUserWithoutTargetUser, updatedValues]);
  }
  // delete the user for the list
  function deleteUser(userToDelete) {
    const allTheUserWithoutTargetUser = users.filter(
      (user) => user.email != userToDelete.email
    );
    const remainingData = JSON.stringify([
      ...allTheUserWithoutTargetUser,
      {
        username: "admin",
        password: "ad12343211ad",
      },
    ]);
    localStorage.setItem("users", remainingData);
    setUsers(
      JSON.parse(localStorage.getItem("users")).filter(
        (user) => user.username != "admin"
      )
    );
    toast.success("The user has been deleted");
    setUserToEdit(null);
    setShowEditPage(false);
  }
  // used for the avatar if no image or error loading then the first char of the username
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
          margin: 20,
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
