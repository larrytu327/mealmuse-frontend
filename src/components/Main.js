import { Routes, Route } from "react-router-dom"
import Restaurants from "../pages/Restaurants"
import Show from "../pages/Show"
const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Show />} />
      </Routes>
    </main>
  )
}

export default Main
