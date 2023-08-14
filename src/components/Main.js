import { Routes, Route } from "react-router-dom"
import Restaurants from "../pages/Restaurants"
import RestaurantShow from "../pages/RestaurantShow"

const Main = () => {
  return (
    <main>
      <Routes>
      <Route path="/restaurants">
          <Route path="" element={<Restaurants />} />
          <Route path=":id" element={<RestaurantShow />} />
        </Route>
      </Routes>
    </main>
  )
}

export default Main
