import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const MyRestaurants = ({isLoggedIn, token}) => {
    const [myRestaurants, setMyRestaurants] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getMyRestaurants = async () => {
            try {
                const response = await fetch("http://localhost:4000/auth/get-user", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const allMyRestaurants = await response.json();
                    setMyRestaurants(allMyRestaurants);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch(err) {
                console.log(err);
            }
        }
        getMyRestaurants();
    }, [token]);

    const loaded = () => {
        return (
          <div className='container mt-4'>
            <div className="row">
              {myRestaurants.map((restaurant) => {
                const isFavorite = isLoggedIn && user && user.fav_restaurants && user.fav_restaurants.includes(restaurant._id);
      
                return (
                  <div className='col-md-4 mb-4' key={restaurant._id}>
                    <Link to={`/restaurants/${restaurant._id}`}>
                      <p className='h3'>{restaurant.name}</p>
                      <img src={restaurant.image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={restaurant.name}></img>
                    </Link>
                    <p className='h4'>{restaurant.categories[0].title}</p>
                    <p className='h4'>{restaurant.rating} ⭐ </p>
                    {isLoggedIn ? (
                      isFavorite ? (
                        <button onClick={() => addToMyRestaurants(restaurant)}>
                          Remove from My Restaurants
                        </button>
                      ) : (
                        <button onClick={() => addToMyRestaurants(restaurant)}>
                          Add to My Restaurants
                        </button>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      };
      
      
        const loading = () => (
          <section className="restaurants-list">
            <h1>
              No Favorite Restaurants
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
              {myRestaurants && myRestaurants.length ? loaded() : loading()}
          </div>
        );
}

export default MyRestaurants;