import React, { createContext, useEffect, useState } from "react";
import RegisterPage from "./pages/Register";
import "./App.css";
import LoginPage from "./pages/Login";
import Profile from "./pages/loged-in/Profile";
import { Toaster } from "sonner";
export const showContext = createContext();

// function that get he users array from the local storage if there are not users then return empty array
export const loadUsers = () => {
  const loadData = localStorage.getItem("users");
  const users =
    loadData &&
    JSON.parse(loadData.length == 0 ? [] : localStorage.getItem("users"));
  return users;
};

function App() {
  // get the user that is in the system if the user is not loged in still in login page if not go tp profile
  const getLoginUser = JSON.parse(sessionStorage.getItem("user"));
  // this used as context for showing the pages
  const [showPage, setShowPage] = useState(getLoginUser ? "profile" : "login");
  // load the admin to the local storage if no users in it
  useEffect(() => {
    const users = loadUsers();
    (users == null || users.length == 0) &&
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            username: "admin",
            password: "ad12343211ad",
          },
        ])
      );
  }, []);
  return (
    <>
      <showContext.Provider value={setShowPage}>
        {showPage === "register" && <RegisterPage />}
        {showPage === "login" && <LoginPage />}
        {showPage === "profile" && <Profile />}
      </showContext.Provider>
      <Toaster expand={true} richColors />
    </>
  );
}

export default App;
