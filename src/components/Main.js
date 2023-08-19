import { Routes, Route } from "react-router-dom";
import Restaurants from "../pages/Restaurants";
import RestaurantShow from "../pages/RestaurantShow";
import LoginForm from "../pages/LoginForm";
import RegisterForm from "../pages/RegisterForm";

const Main = ({ isLoggedIn, signup, login, user}) => {
  return (
    <main>
      <Routes>
        <Route path="/restaurants/*">
          <Route index element={<Restaurants isLoggedIn={isLoggedIn}/>} />
          <Route path=":id" element={<RestaurantShow isLoggedIn={isLoggedIn}/>} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm signup={signup} />} />
      </Routes>
    </main>
  );
};

export default Main;
