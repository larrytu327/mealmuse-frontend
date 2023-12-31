import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


const Header = ({ user, isLoggedIn, logout }) => {
  const navigate = useNavigate();

  console.log("header")
  console.log(isLoggedIn)
  console.log(user)

  const handleLogout = () => {
    logout();
    console.log(isLoggedIn)
    console.log(user)
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/restaurants">Meal Muse</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/restaurants">Restaurants</Link>
            </li>
            <>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/myrestaurants">My Favorite Restaurants</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}to="/">Logout</Link>
                  </li>
                </>
              ) : (
                <Link className='nav-link' to='/login'>Login</Link>
              )}
            </>
          </ul>
        </div>
      </div>
    </nav>
  )
}
  
  export default Header
