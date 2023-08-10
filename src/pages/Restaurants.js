import { useState, useEffect } from 'react'

const Restaurants = (props) =>{

    const [restaurants, setRestaurants] = useState([])

		const BASE_URL = "http://mealmuse-backend.onrender.com/restaurants/";

    const getRestaurants = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allRestaurants = await response.json()
            setRestaurants(allRestaurants)
        }catch(err){
            console.log(err)
        }

    }

    useEffect(()=>{getRestaurants()}, [])

    console.log(`There are ${restaurants.length} restaurants available to render`)

    const loaded = () => {
        return restaurants?.map((restaurant) => {
          return (
            <div key={restaurant._id}>
                <p className='h3'>{restaurant.name}</p>
                <img src={restaurant.image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={restaurant.name}></img>
                <p className='h4'>{restaurant.categories[0].title}</p>
                <p className='h4'>{restaurant.rating} ⭐ </p>
            </div>
          );
        });
      };
    
      const loading = () => (
        <section className="restaurants-list">
          <h1>
            Loading...
            <span>
              <img
                className="spinner"
                src="https://freesvg.org/img/1544764567.png"
              alt="spinner" />{" "}
            </span>
          </h1>
        </section>
      );
    
      return (
        <section className="restaurants-list">{restaurants && restaurants.length ? loaded() : loading()}</section>
      );
}

export default Restaurants
