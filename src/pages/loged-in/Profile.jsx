import React, { useContext, useEffect, useState } from "react";
import SystemAdmin from "./SystemAdmin";
import { Avatar, Box, Button, Paper } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import { showContext } from "../../App";
import EditDetails from "./EditDetails";
export default function Profile() {
  // used for showing the page wanted
  const setShowPage = useContext(showContext);
  // this used for holding the current user for rendering
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  // this bool used as indicator if we want to update the user or not and this will show the edit page
  const [updateUser, setUpdateUser] = useState(false);
  useEffect(() => {
    currentUser ?? setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);
  // show the detalis page
  const showDetailsPage = () => {
    setUpdateUser((prev) => !prev);
  };
  // log out the user by clearing hte session storage
  const logoutUser = () => {
    sessionStorage.clear();
    setCurrentUser(null);
    setShowPage("login");
  };
  //used for the avatar to get the first char of the username to present in hte avatar if there are an error loading the image or no image for the user
  function stringAvatar(name) {
    return {
      children: name[0],
    };
  }
  return (
    <>
      {currentUser && (
        <>
          {currentUser.username != "admin" && (
            <>
              {!updateUser && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <Paper
                    style={{
                      padding: "20px",
                      borderRadius: "10px",
                      width: "fit-content",
                      backgroundColor: " rgba(255, 255, 255, 0.7)",
                      boxShadow: "0 0 10px black",
                      backdropFilter: "saturate(180%) blur(10px)",
                    }}
                  >
                    <div
                      className="profile-image"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Avatar
                        sx={{
                          width: "200px",
                          height: "200px",
                          fontSize: "100px",
                          backgroundColor: "skyblue",
                        }}
                        src={currentUser.userImage}
                        {...stringAvatar(currentUser.username)}
                      ></Avatar>
                    </div>
                    <div
                      style={{ display: "grid", gap: "10px", padding: "10px" }}
                    >
                      <h1>{currentUser.username}</h1>
                      <h3
                        style={{
                          display: "flex",
                          alignContent: "center",
                          gap: 10,
                        }}
                      >
                        <EmailIcon />
                        <span>{currentUser.email}</span>
                      </h3>
                      <h3
                        style={{
                          display: "flex",
                          alignContent: "center",
                          gap: 10,
                        }}
                      >
                        <LocationOnIcon />
                        <span>
                          {currentUser.roadName}, {currentUser.city}
                        </span>
                      </h3>
                      <h3
                        style={{
                          display: "flex",
                          alignContent: "center",
                          gap: 10,
                        }}
                      >
                        <CakeIcon />
                        <span>{currentUser.birthday}</span>
                      </h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                      className="buttons"
                    >
                      <Button
                        onClick={showDetailsPage}
                        variant="contained"
                        color="primary"
                      >
                        Update Profile
                      </Button>
                      <Button
                        href="https://snake.io/"
                        target="_blank"
                        variant="contained"
                        color="primary"
                      >
                        Game
                      </Button>
                      <Button
                        onClick={logoutUser}
                        variant="contained"
                        color="secondary"
                      >
                        Logout
                      </Button>
                    </div>
                  </Paper>
                </Box>
              )}
              {updateUser && (
                <EditDetails
                  UserDetails={currentUser}
                  sendUpdatedUser={(updatedValues) => {
                    setCurrentUser(updatedValues);
                    setUpdateUser(false);
                  }}
                />
              )}
            </>
          )}
          {currentUser.username == "admin" && (
            <SystemAdmin setShowPage={setShowPage} />
          )}
        </>
      )}
    </>
  );
}
