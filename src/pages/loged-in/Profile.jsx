import React, { useContext, useEffect, useState } from "react";
import SystemAdmin from "./SystemAdmin";
import { Button, Paper } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
export default function Profile() {
  const [userLogedIn, setUserLogedIn] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  useEffect(() => {
    userLogedIn ?? setUserLogedIn(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  // const showDetailsPage = () => {
  //   console.log(userLogedIn);
  //   userLogedIn && setShow((prev) => !prev);
  // };
  const logoutUser = () => {
    sessionStorage.clear();
    setUserLogedIn(null);
  };
  return (
    <>
      {userLogedIn && (
        <>
          {userLogedIn.username != "admin" && (
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
              <div className="profile-area">
                <div className="profile-image" style={{ gridArea: "image" }}>
                  <img
                    src={userLogedIn.userImage}
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
                    }}
                  />
                </div>
                <div style={{ gridArea: "text" }}>
                  <h1>{userLogedIn.username}</h1>
                  <h3
                    style={{ display: "flex", alignContent: "center", gap: 10 }}
                  >
                    <EmailIcon />
                    <span>{userLogedIn.email}</span>
                  </h3>
                  <h3
                    style={{ display: "flex", alignContent: "center", gap: 10 }}
                  >
                    <LocationOnIcon />
                    <span>
                      {userLogedIn.roadName}, {userLogedIn.city}
                    </span>
                  </h3>
                  <h3
                    style={{ display: "flex", alignContent: "center", gap: 10 }}
                  >
                    <CakeIcon />
                    <span>{userLogedIn.birthday}</span>
                  </h3>
                </div>
                <div
                  style={{
                    gridArea: "button",
                  }}
                  className="buttons"
                >
                  <Button
                    // onClick={showDetailsPage}
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
              </div>
            </Paper>
          )}
          {/* {userLogedIn.type == "admin" && <SystemAdmin />} */}
        </>
      )}
    </>
  );
}
