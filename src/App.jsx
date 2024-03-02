import React, { createContext, useEffect, useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import LoginPage from "./pages/LoginPage";
export const showContext = createContext();

function App() {
  const [showPage, setShowPage] = useState("login");
  useEffect(() => {
    // sessionStorage.clear();
    const loadData = localStorage.getItem("users");
    const users =
      loadData &&
      JSON.parse(loadData.length == 0 ? [] : localStorage.getItem("users"));
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
