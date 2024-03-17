import React, { useState } from 'react'
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";


export default function Register() {
  
  const [values,setValues] = useState({email:"", password:""});
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        console.log(values);
        // const {data} = await axios.post("http://localhost:4000/register",{...values});
        const data = await axios.post("http://localhost:4000/register",{...values},{withCredentials: true})
                .then(resp => {
                console.log(resp.data);
                })
        console.log(data);
        if(data){
          if(data.errors){
            console.log("Register post data error "+data.errors);
          }  
          else{
            navigate("/")
            }
          
        }
      }catch(err){
      console.log("Register post error "+err.message);
    }
  }
  
  return (
    <div className='container'>
      <h2>Register account</h2>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div>
              <label htmlFor='email'>Email</label>
              <input type='email' 
                      name='email'
                      placeholder='email' 
                      onChange={(e)=>{
                        setValues({...values,[e.target.name]:e.target.value})
                        }
                      }
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input type='password' 
                     name='password' 
                     placeholder='password'
                     onChange={(e)=>{
                      setValues({...values,[e.target.name]:e.target.value})
                      }
                    }
              />
            </div>
            <button type="submit" >Submit</button>
              <span>
                Already have an account ?<Link to="/login"> Login</Link>
                </span>
        </form>

    </div>
  )
}
