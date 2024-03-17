import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const [values,setValues] = useState({email:"", password:""});
  const navigate = useNavigate();
  const handleLoginSubmit = async (e)=>{
    e.preventDefault();
    try{
          const {data} = await axios.post("http://localhost:4000/login",{...values},{withCredentials: true})
          if(data){
            if(data.errors){}
            else{
              console.log("logged in");
              navigate("/");
            }
          }
    }catch(err){
      console.log("login error: "+ err);
    }

  }

  return (
    <div className='container'>
      <h2>Login account</h2>
      <form onSubmit={(e)=>{handleLoginSubmit(e)}}>
            <div>
              <label htmlFor='email'>Email</label>
              <input type='email' name='email' placeholder='email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' placeholder='password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <button type="submit">Submit</button>
              <span>
                Sign up for new account ?<Link to="/register"> Register</Link>
                </span>
        </form>

    </div>
  )
}
