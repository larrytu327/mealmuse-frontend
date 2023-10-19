import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const MyRestaurants = ({isLoggedIn, token}) => {
    // const [myRestaurants, setMyRestaurants] = useState([]);
    const [user, setUser] = useState(null);
    const [removedRestaurants, setRemovedRestaurants] = useState([]); 
    const [addedRestaurantToRandomizer, setAddedRestaurantToRandomizer] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:4000/auth/get-user", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData)
                    setUser(userData);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch(err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [token]);

    const removeRestaurant = async (restaurant) => {
        try {
          const response = await fetch(`http://localhost:4000/auth/add-to-favorites`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ restaurant }),
          });
          if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser.user);
            console.log(`Removed ${restaurant.name} from fav_restaurants`)
            console.log("Remove clicked");
            console.log(Array.isArray(removedRestaurants));
            console.log(removedRestaurants.length)
            console.log(restaurant);
            setRemovedRestaurants([...removedRestaurants, restaurant]);
          } else {
            console.error('Failed to remove restaurant from favorites');
          }
        } catch (err) {
          console.log(err);
        }
      };

    const addToFindRandom = async (restaurant) => {
        try {
            const response = await fetch(`http://localhost:4000/auth/add-to-randomizer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ restaurant }),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser.user);
                console.log(`Added ${restaurant.name} to randomizer`)
                setAddedRestaurantToRandomizer([...addedRestaurantToRandomizer, restaurant]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const loaded = () => {
        const undoLastRemoval = () => {
            const lastRemovedRestaurant = removedRestaurants[removedRestaurants.length - 1];
            removeRestaurant(lastRemovedRestaurant);
            setRemovedRestaurants([]);
        }
        return (
            <>
                <h1>{user.first_name} {user.last_name}'s Favorite Restaurants</h1>  
                <div className='container mt-4'>
                    <div className="row">
                    {user.fav_restaurants.map((restaurant) => {

                        return (
                        <div className='col-md-4 mb-4' key={restaurant._id}>
                            <Link to={`/restaurants/${restaurant._id}`}>
                            <p className='h3'>{restaurant.name}</p>
                            <img src={restaurant.image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={restaurant.name}></img>
                            </Link>
                            <p className='h4'>{restaurant.categories[0].title}</p>
                            <p className='h4'>{restaurant.rating} ⭐ </p>
                            <button onClick={() => { removeRestaurant(restaurant) }}>Remove from My Favorite Restaurants</button>
                            <p></p>
                            <button onClick={() => { addToFindRandom(restaurant) }}>Add to Randomizer</button>
                        </div>
                        );
                    })}
                    </div>
                </div>
                {removedRestaurants.length > 0 && (
                    <button onClick={() => {undoLastRemoval()}}>Undo Last Removal</button>
                )}
                <p></p>
                <p className='h3'>List of Restaurants for the Randomizer</p>
                {addedRestaurantToRandomizer.length > 0 ? (
                    user.addedToRandomizer.map((restaurant) => (
                        <>
                            <p>
                                <Link className='h4' to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
                            </p>
                        </>
                    ))
                ) : (
                    <p>No Restaurants Added to the Randomizer Yet</p>
                    )
                }
            </>
        );
      };
      
      
        const loading = () => (
          <section className="restaurants-list">
            <h1>
              No User Logged In
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
              {user ? loaded() : loading()}
          </div>
        );
}

export default MyRestaurants;