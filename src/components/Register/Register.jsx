import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function Register() {
  let baseURL='https://routeegypt.herokuapp.com/';
  const [user, setUser] = useState({'first_name':'','last_name':'','age':'','email':'','password':''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isloading, setIsLoading] = useState(false)
const [errorList, setErrorList] = useState([])
  let navigate=useNavigate();



   async function getSubmitData(e){
  e.preventDefault();
  let validateResponse = validateForm();
  if(validateResponse.error){
    setErrorList(validateResponse.error.details);

  }
  else{
    setIsLoading(true)
  let {data}= await axios.post(baseURL+'signup', user);
  setIsLoading(false)
  console.log(data);
  if(data.message=='success')
  {
   
    setSuccess(data.message)
   
    navigate('/login')

  }else{
setError(data.message)

  }

  }
  
  function validateForm(){

    const schema = Joi.object({

first_name:Joi.string().alphanum().required().min(3).max(15),
last_name:Joi.string().alphanum().required().min(3).max(15),
age:Joi.number().required().min(18).max(90),
email:Joi.string().required().email({  tlds: { allow: ['com', 'net'] } }),
password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))



    })
    return schema .validate(user,{abortEarly:false});
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
    <h2>Form Registation</h2>
    <form onSubmit={getSubmitData} >
    <div>
<label htmlFor="frist-name" >FristName:</label>
  <input onChange={getUserData} type="text" name="first_name" className='form-control'  />

    </div>
    <div>
<label htmlFor="last-name">LastName:</label>
  <input onChange={getUserData} type="text" name="last_name" className='form-control' />

    </div>
    <div>
<label htmlFor="age">Age:</label>
  <input onChange={getUserData} type="number" name="age" className='form-control' />

    </div>
    <div>
<label htmlFor="email">Email:</label>
  <input onChange={getUserData} type="email" name="email" className='form-control' />

    </div>
    <div>
<label htmlFor="password">Password:</label>
  <input onChange={getUserData} type="password" name="password" className='form-control' />

    </div>
    
    <button type='submit' className={'btn btn-outline-info float-end my-4 '+ (isloading? " disabled":"") }>{isloading?<i className="fa fa-spinner fa-spin"></i>:'Register'}</button>
    <div className="clearfix"></div>
   
    {errorList.map((errors,index)=> <div key={index} className="alert alert-danger my-2">{errors.message}</div>
    )}
    
{error?<div className="alert alert-danger my-2">{error}</div>:''}
{success?<div className="alert alert-success my-2">{success}</div>:''}
   
    </form>
  </div>
</div>

    </>
  )
}
