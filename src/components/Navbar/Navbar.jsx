
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

import React from 'react'


export default function Navbar(props) {
  
  return (
    <>
<nav className={ `${styles.navBackGround} navbar navbar-expand-lg navbar-dark bg-transparent`}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">noax</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {props.userdata? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="tvshow">Tv Shows</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="pepole">Pepole</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="search">searc</Link>
        </li>
        
        
      </ul>:''}


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        <div className='d-flex justify-content-center align-items-center '>
          <div className="div w-50  mx-3">
            <input onChange={props.searchTrending} name='searchInput'   type="text" className='form-control' />
          </div>
        <i className='fa fa-brands fa-facebook mx-1'></i>
        <i className='fa fa-brands fa-instagram mx-1'></i>
        <i className='fa fa-brands fa-twitter mx-1'></i>
        <i className='fa fa-brands fa-spotify mx-1'></i>

        </div>

        {props.userdata?<li className="nav-item">
          <span className='mx-2' >Weclome ,{props.userdata.first_name}<i className="fa-solid fa-heart mx-1"></i></span>
          <a onClick={props.logout} className="nav-link d-inline-block " to="logout">Logout</a>
        </li>: <>
        
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li> 
        </>}
       
        
        </ul>
      
    </div>
  </div>
</nav>

    </>
  )
}
