
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MoviesDetalis from './components/MoviesDetalis/MoviesDetalis';
import Notfound from './components/Notfound/Notfound';
import TvDetalis from './components/TvDetalias/TvDetalis';
import ActorsDetalis from './components/ActorsDetalis/ActorsDetalis';

import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Movies from './components/Movies/Movies';
import Tvshow from './components/TvShowes/Tvshow';
import Search from './components/SearchItems/Search';
import axios from 'axios';
import People from './components/Pepole/People';


function App() {
const [userdata, setUserdata] = useState(null)
let navigate =useNavigate();

  function saveUserData(){
    let encodedToken=localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    setUserdata(decodedToken)
    console.log(decodedToken);
  }


  useEffect(() => {
    if(localStorage.getItem('token')!=null)
  
    {
      saveUserData()
    }
  }, [])

  function logout(){
    localStorage.removeItem('token')
    setUserdata(null)
    navigate('/login')
  }
  
  function ProtectedRoute(props){
    if(localStorage.getItem('token')==null)
    {
      return <Navigate to="/login"/>
    }
    else{
 return props.children;
      
    }
  }
  const [TrendingMovies, setTrendingMovies] = useState([])

  
  
  async function searchTrending(){
let term = document.getElementById('searchInput').value;

    let {data} =await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${term}`);
    setTrendingMovies (data.results);
    
  }
  
  return (
    <>
    <Navbar userdata={userdata} logout={logout} searchTrending={searchTrending}/>
    <div className='container'>
<Routes>
<Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
  <Route path='register' element={<Register/>}/>
  <Route path='login' element={<Login saveUserData={saveUserData} />}/>
  <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
  <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
  <Route path='search' element={<ProtectedRoute><Search TrendingMovies={TrendingMovies}/></ProtectedRoute>}/>
  <Route path='tvshow' element={<ProtectedRoute><Tvshow/></ProtectedRoute>}/>
  <Route path='pepole' element={<ProtectedRoute><People/></ProtectedRoute>}/>
  <Route path='detalis' element={<ProtectedRoute><MoviesDetalis/></ProtectedRoute>}/>
  <Route path='tvdetalis' element={<ProtectedRoute><TvDetalis/></ProtectedRoute>}/>
  <Route path='actordetalis' element={<ProtectedRoute><ActorsDetalis/></ProtectedRoute>}/>
  <Route path='*' element={<Notfound/>}/>
    </Routes>
    </div>
    </>
  );
}

export default App;
