import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  let baseURL='https://route-movies-api.vercel.app/';
  const [user, setUser] = useState({'email':'','password':''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isloading, setIsLoading] = useState(false)
  let navigate=useNavigate();

  async function getLogin(e){
    e.preventDefault();
    setIsLoading(true)
    let {data}= await axios.post(baseURL+'signin', user);
    setIsLoading(false)
    console.log(data);
    if(data.message=='success')
    {
      localStorage.setItem('token',data.token)
      props.saveUserData();
      setSuccess(data.message)
     
      navigate('/home')
  
    }else{
  setError(data.message)
  
    }
  
    }

  function getUserData(e){
    setUser({...user, [e.target.name]:e.target.value});
console.log(user);

  }
  return (
    <>
<div className="container">
  <div className="w-75 m-auto my-4">
    <h2>Form Login</h2>
    <form onSubmit={getLogin} >
       <div>
<label htmlFor="email">Email:</label>
  <input onChange={getUserData} type="email" name="email" className='form-control' />

    </div>
    <div>
<label htmlFor="password">Password:</label>
  <input onChange={getUserData} type="password" name="password" className='form-control' />

    </div>
    
    <button type='submit' className={'btn btn-outline-info float-end my-4 '+ (isloading? " disabled":"") }>{isloading?<i className="fa fa-spinner fa-spin"></i>:'Login'}</button>
    <div className="clearfix"></div>
   
    
    
{error?<div className="alert alert-danger my-2">{error}</div>:''}
{success?<div className="alert alert-success my-2">{success}</div>:''}
   
    </form>
  </div>
</div>


    </>
  )
}
