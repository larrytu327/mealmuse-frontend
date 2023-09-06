import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function RestaurantShow({isLoggedIn}) {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();
    const URL = `http://localhost:4000/restaurants/${id}`

    async function getRestaurant() {
        try {
            let myRestaurant = await fetch(URL);
            myRestaurant = await myRestaurant.json();
            setRestaurant(myRestaurant);
        } catch (err) {
            console.log(err)
        }
    }

    console.log(`Current Restaurant: ${JSON.stringify(restaurant)}`)

    useEffect(()=>{
        getRestaurant(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function loaded(restaurant) {
        return (
            <>
                <p className='h3'>{restaurant.name}</p>
                <img src={restaurant.image_url} className="img-fluid fixed-size-image rounded shadow mx-auto d-block" alt={restaurant.name}></img>
                <p className='h4'>{restaurant.categories[0].title}</p>
                <p className='h4'>{restaurant.rating} ⭐ </p>
                <p>Categories: {restaurant.categories.map((category, idx) => {
                    if (idx === restaurant.categories.length - 1) {
                        return <span key={category.id}> {category.title}</span> 
                    } else {
                        return ( 
                            <span key={category.id}>{category.title} | </span>
                        )
                    }
                })}</p>
            </>
        )
    }
        
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
    )
    
    return restaurant ? loaded(restaurant) : loading()    
}

export default RestaurantShow
