import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { clearUserToken, setUserToken, getUserToken } from "./utils/authToken"

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const userToken = getUserToken();

  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }

      const newUser = await fetch("http://localhost:4000/auth/register", configs)

      const parsedUser = await newUser.json()
      console.log(parsedUser);
      console.log(`parsedUser.token: ${parsedUser.token}`)
      console.log(`parsedUser.currentUser: ${parsedUser.user.first_name}`)
      console.log(`BEFORE: ${currentUser.first_name}`)
      console.log(`parsedUser.loggedIn: ${parsedUser.isLoggedIn}`)
      console.log(`BEFORE: ${isAuthenticated}`)

      //sets local storage
      setUserToken(parsedUser.token);
      //put the returned user object in state
      setCurrentUser(parsedUser.user);
      //adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.isLoggedIn);
      console.log(`parsedUser.token: ${parsedUser.token}`)
      console.log(`parsedUser.currentUser: ${parsedUser.user.first_name}`)
      console.log(`AFTER: ${currentUser.first_name}`)
      console.log(`parsedUser.loggedIn: ${parsedUser.isLoggedIn}`)
      console.log(`AFTER: ${isAuthenticated}`)
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
        "http://localhost:4000/auth/login",
        configs
      )
      const user = await response.json()
      console.log("this shows the user")
      console.log(user)
      console.log(user.user.first_name)

      setUserToken(user.token)
      setCurrentUser(user.currentUser)
      setIsAuthenticated(user.isLoggedIn)

      return user;
    } catch (err) {
      console.log(err);
      clearUserToken();
      setIsAuthenticated(false);
    }
  }

  const logoutUser = () => {
    clearUserToken();
    setCurrentUser({});
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Header user={currentUser} isLoggedIn={isAuthenticated} logout={logoutUser}/>
      <Main isLoggedIn={isAuthenticated} signup={registerUser} login={loginUser} user={currentUser} token={userToken}/>
      <Footer user={currentUser} />
    </div>
  );
}

export default App;