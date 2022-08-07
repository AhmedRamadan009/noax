import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search(props) {
    let navigate =useNavigate();
    let imgBaseUrl ='https://image.tmdb.org/t/p/w500';
    function getDetalis(id){
        navigate({
    pathname:'/detalis',
    search:`?id=${id}`,
    
        })
      }
  return (
    <>

<div className="row">



{props.TrendingMovies.map((movie)=>


<div onClick={()=>getDetalis(movie.id)} key={movie.id} className="col-md-2 gy-3">
  <div className="movieDisplay position-relative">
    <img src={imgBaseUrl+movie.poster_path} className='w-100'  />
    <h2 className='h5 text-center mt-2'>{movie.title}</h2>
    <div className="bg-info w-25 position-absolute top-0 end-0 text-center">
    
  <span>{Math.floor( movie.vote_average)}<i className="fa-solid fa-star"></i></span>  
  </div>
  </div>
  
</div>




)}

</div>

    </>
  )
}
