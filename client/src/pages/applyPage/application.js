import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './application.css';
export default function Application() {
    const [values,setValues] = useState({title:"", description:"",  applicationStatus:"review"});
    const navigate = useNavigate();
    const handleLoginSubmit = async (e)=>{
      e.preventDefault();
      try{
            
            const {data} = await axios.post("http://localhost:4000/apply",{...values},{withCredentials: true})
            if(data){
              if(data.errors){}
              else{
                console.log("apply connection made");
              }
            }
      }catch(err){
        console.log("Apply connection error: "+ err);
      }
  
    }



  return (
    <div className='Patentcontainer'>
    <h2>Patent Apply</h2>
    <form onSubmit={(e)=>{handleLoginSubmit(e)}} className='patentapplication'>
          <div>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' placeholder='title' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            {/* <input type='text' name='description'  className='descriptionBox' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/> */}
          </div>
          <textarea id="address"  name='description'  onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}  rows="4" placeholder="Patent description"></textarea>
          <button type="submit" className='patenSubmit'>Submit</button>
            
      </form>

  </div>
  )
}
