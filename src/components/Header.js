import React from 'react';
import { useNavigate } from 'react-router';

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
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Meal Muse</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/restaurants">Restaurants</a>
            </li>
            <li className='nav-item'>
              {isLoggedIn ? (
                <button className="nav-button" onClick={handleLogout}>Logout</button>
              ) : (
                <a className='nav-link' href='/login'>Login</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
  
  export default Header
  