import { Routes, Route } from "react-router-dom";
import Restaurants from "../pages/Restaurants";
import RestaurantShow from "../pages/RestaurantShow";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";
import MyRestaurants from "../pages/MyRestaurants";

const Main = ({ isLoggedIn, signup, login, user, token}) => {
  return (
    <main>
      <Routes>
        <Route path="/restaurants/*">
          <Route index element={<Restaurants isLoggedIn={isLoggedIn} user={user} token={token}/>} />
          <Route path=":id" element={<RestaurantShow isLoggedIn={isLoggedIn} user={user} token={token}/>} />
        </Route>
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/register" element={<RegisterForm signup={signup} />} />
        <Route path="/myrestaurants" element={<MyRestaurants isLoggedIn={isLoggedIn} token={token} user={user} />} />
      </Routes>
    </main>
  );
};

export default Main;
