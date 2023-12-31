import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Restaurants = ({isLoggedIn, token}) =>{

    const [restaurants, setRestaurants] = useState([])
    const [user, setUser] = useState(null);
    const [citySearch, setCitySearch] = useState(null);
    const uniqueCategories = Array.from(new Set(restaurants.map(restaurant => restaurant.categories[0].title)));
    const sortedCategories = uniqueCategories.sort();
    const [category, setCategory] = useState();

		const BASE_URL = "http://localhost:4000/restaurants/";

    const getRestaurants = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allRestaurants = await response.json()
            setRestaurants(allRestaurants);
        }catch(err){
            console.log(err)
        }
    }

    const addToMyRestaurants = async (restaurant) => {
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
          console.log(`Added ${restaurant.name} to fav_restaurants, with _id: ${restaurant.id}`)
        } else {
          console.error('Failed to add restaurant to favorites');
        }
      } catch (err) {
        console.log(err);
      }
    };

    const settingCity = async (city) => {
      try {
        setCitySearch(city);
        const response = await fetch(`${BASE_URL}?location=${city}&categories=undefined`);
        const updatedRestaurants = await response.json();
        setRestaurants(updatedRestaurants);
      } catch (err) {
        console.log(err);
      }
    }

    const filterByCategory = async(categoryChosen, city) => {
      try {
        const lowerCaseCategory = categoryChosen.toLowerCase();
        setCategory(lowerCaseCategory);
        const response = await fetch(`${BASE_URL}?location=${city}&categories=${lowerCaseCategory}`);
        const updatedRestaurantsWithCategory = await response.json();
        setRestaurants(updatedRestaurantsWithCategory);
      } catch(err) {
        console.log(err);
      }
    }
    
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch('http://localhost:4000/auth/get-user', {
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
        } catch (err) {
          console.log(err);
        }
      };
      getRestaurants();
      fetchUser();
    }, [token]);

    console.log(`There are ${restaurants.length} restaurants available to render`)
    console.log(`isLoggedIn: ${isLoggedIn}`)
    // console.log(`user is: ${user.user.first_name}`);

    const loaded = () => {
      return (
        <>
          <div class="btn-group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              City: {restaurants[0].location.city}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><button class="dropdown-item" onClick={() => settingCity("Austin", category)} >Austin</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("Boston", category)}>Boston</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("Chicago", category)}>Chicago</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("Houston", category)}>Houston</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("Kansas_City", category)}>Kansas City</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("Los_Angeles", category)}>Los Angeles</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("New_York", category)}>New York</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("Portland", category)}>Portland</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("San_Francisco", category)}>San Francisco</button></li>
              <li><button class="dropdown-item" onClick={() => settingCity("Seattle", category)}>Seattle</button></li>
            </ul>
          </div>
          <p></p>
          <div class="btn-group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Filter by Restaurant Category: {category}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {sortedCategories.map((category) => (
                <li key={category}>
                  <button className="dropdown-item" onClick={() => filterByCategory(category, citySearch)} >{category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='container mt-4'>
            <div className="row">
              {restaurants.map((restaurant) => {
                const isFavorite = user && user.fav_restaurants.find(favRestaurant => favRestaurant.id === restaurant.id) !== undefined;
                return (
                  <div className='col-md-4 mb-4' key={restaurant.id}>
                    <Link to={`/restaurants/${restaurant.id}`}>
                      <p className='h3'>{restaurant.name}</p>
                      <img src={restaurant.image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={restaurant.name}></img>
                    </Link>
                    <p className='h4'>{restaurant.categories[0].title}</p>
                    <p className='h4'>{restaurant.rating} ⭐ </p>
                    {isLoggedIn && (
                      <button type="button" class={`btn ${isFavorite ? "btn-danger" : "btn-secondary"}`} onClick={() => { addToMyRestaurants(restaurant)}}>{isFavorite ? "Remove from My Favorite Restaurants" : "Add to My Favorite Restaurants"}</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
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
