import React, { createContext, useEffect, useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/loged-in/Profile";
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
  const getLoginUser = JSON.parse(sessionStorage.getItem("user"));
  const [showPage, setShowPage] = useState(getLoginUser ? "profile" : "login");

  useEffect(() => {
    // clear the session storage
    // sessionStorage.clear();
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
    </>
  );
}

export default App;
