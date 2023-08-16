import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { setCurrentUser, clearUserToken, setUserToken } from "./utils/authToken"
import { parse } from "@fortawesome/fontawesome-svg-core";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }

      const newUser = await fetch("http://mealmuse-backend.onrender.com/auth/register", configs)

      const parsedUser = await newUser.json()
      console.log(parsedUser);

      //sets local storage
      setUserToken(parsedUser.token);
      //put the returned user object in state
      setCurrentUser(parsedUser.currentUser);
      //adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.loggedIn);

      return parsedUser
    } catch (err) {
      console.log(err)
      clearUserToken();
      setIsAuthenticated(false);
    }
  }

  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await fetch(
        "http://mealmuse-backend.onrender.com/auth/login",
        configs
      )
      const user = await response.json()
      console.log(user)

      setUserToken(user.token)
      setCurrentUser(user.currentUser)
      setIsAuthenticated(user.loggedIn)

      return user;
    } catch (err) {
      clearUserToken();
      setIsAuthenticated(false);
    }
  }

  return (
    <div className="App">
      <Header user={currentUser} />
      <Main isLoggedIn={isAuthenticated} signup={registerUser} login={loginUser} user={currentUser} />
      <Footer user={currentUser} />
    </div>
  );
}

export default App;