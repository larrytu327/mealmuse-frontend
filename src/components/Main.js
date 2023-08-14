import { Routes, Route } from "react-router-dom"
import Restaurants from "../pages/Restaurants"
import restaurantShow from "../pages/restaurantShow"
const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<restaurantShow />} />
      </Routes>
    </main>
  )
}

export default Main
