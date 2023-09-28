import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Restaurants = ({isLoggedIn, token}) =>{

    const [restaurants, setRestaurants] = useState([])

		const BASE_URL = "http://localhost:4000/restaurants/";

    const getRestaurants = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allRestaurants = await response.json()
            setRestaurants(allRestaurants)
        }catch(err){
            console.log(err)
        }
    }

    const addToMyRestaurants = async (restaurantId) => {
      try {
        const response = await fetch(`http://localhost:4000/auth/add-to-favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ restaurantId }),
        });
        if (response.ok) {

        } else {
          console.error('Failed to add restaurant to favorites');
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    useEffect(()=>{getRestaurants()}, [])

    console.log(`There are ${restaurants.length} restaurants available to render`)
    console.log(`isLoggedIn: ${isLoggedIn}`)

    const loaded = () => {
        return (
            <div className='container mt-4'>
                <div className="row">
                    {restaurants.map((restaurant) => (
                        <div className='col-md-4 mb-4' key={restaurant._id}>
                            <Link to={`/restaurants/${restaurant._id}`}>
                                <p className='h3'>{restaurant.name}</p>
                                <img src={restaurant.image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={restaurant.name}></img>
                            </Link>
                            <p className='h4'>{restaurant.categories[0].title}</p>
                            <p className='h4'>{restaurant.rating} ⭐ </p>
                            { isLoggedIn ? 
                              (<button onClick={() =>  addToMyRestaurants(restaurant._id)}>Add to My Restaurants</button>) : (<></>)
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
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
        <div>
            {restaurants && restaurants.length ? loaded() : loading()}
        </div>
      );
}

export default Restaurants
