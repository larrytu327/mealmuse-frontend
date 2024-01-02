import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const MyRestaurants = ({isLoggedIn, token}) => {
    // const [myRestaurants, setMyRestaurants] = useState([]);
    const [user, setUser] = useState(null);
    const [removedRestaurants, setRemovedRestaurants] = useState([]); 
    const [addedRestaurantToRandomizer, setAddedRestaurantToRandomizer] = useState([]);
    const [randomIndex, setRandomIndex] = useState([]);
    const [expandedAccordion, setExpandedAccordion] = useState(null);


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
                setRandomIndex(0);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const randomizer = async (array) => {
        try {
            if (array.length < 1) {
                const nothingInArray = 0;
                setRandomIndex(nothingInArray);
                return;
            }
            const random = Math.floor(Math.random()*(array.length))+1;
            console.log(random);
            setRandomIndex(random);
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
        const uniqueCities = new Set();

        const sortedFavRestaurants = [...user.fav_restaurants]
            .filter((value, index, self) => {
                //Use a Set to keep track of unique city values

                //Function to check if the city is unique
                const isUniqueCity = (restaurant) => {
                    const city = restaurant.location.city.toLowerCase();
                    if (uniqueCities.has(city)) {
                        return false; //Not unique, already encountered
                    }
                    uniqueCities.add(city); //Unique, add to the Set
                    return true;
                };
                //Filter duplicates based on the location.city property
                return isUniqueCity(value);
            })
            .sort((a, b) => {
                const cityA = a.location.city.toLowerCase();
                const cityB = b.location.city.toLowerCase();
                if (cityA < cityB) return -1;
                if (cityA > cityB) return 1;
                return 0;
            });

        const cityAccordions = sortedFavRestaurants.map((restaurant) => {
            const city = restaurant.location.city.toLowerCase();

            console.log(`Processing restaurant ${restaurant.name} in city ${city}`);

            //Check if city is already added to uniqueCities
            if (!uniqueCities.has(city)) {
                uniqueCities.add(city);

                const cityRestaurants = sortedFavRestaurants.filter((r) => r.location.city.toLowerCase() === city);

                console.log(`City ${city} is unique. Adding to accordion.`);

                return (
                    <div className='col-md-4 mb-4' key={restaurant.loading}>
                        <div className="accordion" id={`accordion${restaurant.id}`}>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`heading${restaurant.id}`}>
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${restaurant.id}`}
                                        aria-expanded={expandedAccordion === restaurant.id}
                                        onClick={() => setExpandedAccordion(expandedAccordion === restaurant.id ? null : restaurant.id)}
                                        >{restaurant.location.city}: {restaurant.name}</button>
                                </h2>
                                <div
                                    id={`collapse${restaurant.id}`}
                                    className={`accordion-collapse collapse ${expandedAccordion === restaurant.id ? 'show' : ''}`}
                                    aria-labelledby={`heading${restaurant.id}`}
                                    data-bs-parent={`#accordion${restaurant.id}`}
                                    >
                                        <div className="accordion-body">
                                            {cityRestaurants.map((cityRestaurant) => (
                                                <div className='col-md-4 mb-4' key={cityRestaurant.id}>
                                                    <Link to={`/restaurants/${cityRestaurant.id}`}>
                                                        <p className='h3'>{cityRestaurant.name}</p>
                                                        <img src={cityRestaurant.image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={cityRestaurant.name}></img>
                                                    </Link>
                                                    <p className='h4'>{cityRestaurant.location.city}</p>
                                                    <p className='h4'>{cityRestaurant.categories[0].title}</p>
                                                    <p className='h4'>{cityRestaurant.rating} ⭐ </p>
                                                    <button type="button" className="btn btn-danger" onClick={() => { removeRestaurant(cityRestaurant) }}>Remove from My Favorite Restaurants</button>
                                                    <p></p>
                                                    <button type="button" className="btn btn-primary" onClick={() => { addToFindRandom(cityRestaurant) }}>Add to Randomizer</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                )
            }
            console.log(`City ${city} is not unique. Skipping.`);
            return null;
        });

        console.log("cityAccordions:", cityAccordions);

        return (
            <>
                <button className="btn btn-primary" onClick={() => {randomizer(user.addedToRandomizer)}}>Where Are We Eating??</button>
                <p></p>
                {randomIndex > 0 ? (
                    <>
                        <div className="container p-4 bg-success" style={{maxWidth: '500px', borderRadius: '15px' }}>
                            <Link className="text-black" to={`/restaurants/${user.addedToRandomizer[randomIndex-1].id}`}>
                            <p className='h3'>{user.addedToRandomizer[randomIndex-1].name}</p>
                            <img src={user.addedToRandomizer[randomIndex-1].image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={user.addedToRandomizer[randomIndex-1].name}></img>
                            </Link>
                            <p className='h4'>{user.addedToRandomizer[randomIndex-1].categories[0].title}</p>
                            <p className='h4'>{user.addedToRandomizer[randomIndex-1].rating} ⭐ </p>
                        </div>
                        
                </>
                ) : (<></>)}
                <p></p>
                {addedRestaurantToRandomizer.length > 0 && (
                    <div id="carouselWithCaptions" className="carousel slide" data-bs-ride="carousel">
                        <ol className="carousel-indicators" style={{ listStyleType: "none" }}>
                            {addedRestaurantToRandomizer.map((restaurant, index) => (
                                <li key={index} data-bs-target="#carouselWithCaptions" data-bs-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                            ))}
                        </ol>
                        <div className="carousel-inner">
                            {addedRestaurantToRandomizer.map((restaurant, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={restaurant.image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={`Slide ${index + 1}`} style={{ maxWidth: "1000px" }}></img>
                                        <div className="carousel-caption d-none d-sm-block">
                                            <h5>{restaurant.name}</h5>
                                            <p>{restaurant.categories[0].title}</p>
                                        </div>

                                    </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#carouselWithCaptions" role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselWithCaptions" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </a>
                    </div>
                )}

                {user.addedToRandomizer.length > 0 ? (
                    
                    user.addedToRandomizer.map((restaurant) => (
                        <>
                            <p>
                                <Link key={restaurant.id} className='h4' to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
                                <button class="btn btn-danger m-2" onClick={() => {addToFindRandom(restaurant)}}>Remove</button>
                            </p>
                        </>
                    ))
                ) : (
                    <p>No Restaurants Added to the Randomizer Yet</p>
                    )
                }
                <h1>{user.first_name} {user.last_name}'s Favorite Restaurants</h1>
                <div class="btn-group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort By City
                    </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            {sortedFavRestaurants.map((restaurant) => {
                                return (
                                    <>
                                        <li><button class="dropdown-item" >{restaurant.location.city}</button></li>
                                    </>
                                )
                            })}
                        </ul>
                </div>  
                <div className='container mt-4'>
                    <div className="row">
                        {cityAccordions}
                    </div>
                </div>
                {removedRestaurants.length > 0 && (
                    <button class="btn btn-info" onClick={() => {undoLastRemoval()}}>Undo Last Removal/Add</button>
                )}
                <p></p>
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