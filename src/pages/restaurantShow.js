import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const restaurantShow = () => {
    const [restaurant, setRestaurant] = useState({})
    const { id } = useParams()
    const URL = `http://mealmuse-backend.onrender.com/restaurants/${id}`

    const getRestaurant = async() => {
        try {
            const reponse = await fetch(URL)
            const result = await response.json()
            setRestaurant(result)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(`Current Restaurant: ${JSON.stringify(restaurant)}`)

    useEffect(() => {
        getRestaurant();
    }, [])

    return <h1>Restaurant Show Component</h1>
}




export default restaurantShow