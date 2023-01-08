
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';



export default function Search() {
  const [value, setValue] = useState("");

  const [TrendingMovies, setTrendingMovies] = useState(null)
  let imgBaseUrl ='https://image.tmdb.org/t/p/w500';


  async function getAllTerndings(value){

    let {data} =await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${value}`);
    setTrendingMovies (data.results);
    
  }
  useEffect(() => {
    
    getAllTerndings( );
   
  
   
  }, [])
  
  
 
  return (

    <>

<div className='d-flex justify-content-center align-items-center '>
          <div className="div w-50  mx-3">
            <input onChange={event => setValue( event.target.value)}  name='searchInput'   type="text" className='form-control' />
            {TrendingMovies.filter(movie =>{if (value==='')
          {
          return value;
          
          }else if(movie.title.toLowercase().includes(value.toLowerCase())){

return value;
          }
          }).map((movie ,index)=>(
          
            <div  key={index} className="col-md-2 gy-3">
            <div className="movieDisplay position-relative">
              <img src={imgBaseUrl+movie.poster_path} className='w-100'  />
              <h2 className='h5 text-center mt-2'>{movie.title}</h2>
              <div className="bg-warning w-25 position-absolute top-0 end-0 text-center">
              
            <span>{Math.floor( movie.vote_average)}<i className="fa-solid fa-star"></i></span>  
            </div>
            </div>
            
          </div>
          
          
           ) )
         
          
          
          
          }
          </div>

</div>
    </>
  )
}
