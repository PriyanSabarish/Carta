import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import SignInForm from "./SignInForm";
import './middleware.css';
import axios from "axios";
const SignUpForm = () => {
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
    <>
      <div className="App">
        <div className="appAside" />
        <div className="appForm">
          <div className="pageSwitcher">
            <Link to="/login" className="pageSwitcherItem">
              Sign In
            </Link>
            <Link to="/register" className="pageSwitcherItem">
              Sign Up
            </Link>
          </div>

          <div className="formTitle">
            <Link to="/login" className="formTitleLink">
              Sign In
            </Link>{" "}
            or{" "}
            <Link to="/register" className="formTitleLink">
              Sign Up
            </Link>
          </div>

          <div className="formCenter">
            <form onSubmit={(e)=>{handleSubmit(e)}} className="formFields">
              <div className="formField">
                <label className="formFieldLabel" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="formFieldInput"
                  placeholder="Enter your full name"
                  name="name"
                  
                />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e)=>{
                    setValues({...values,[e.target.name]:e.target.value})
                    }
                  }
                />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email"
                  onChange={(e)=>{
                    setValues({...values,[e.target.name]:e.target.value})
                    }
                  }
                />
              </div>

              <div className="formField">
                <label className="formFieldCheckboxLabel">
                  <input
                    className="formFieldCheckbox"
                    type="checkbox"
                    name="hasAgreed"
                    
                  />{" "}
                  I agree all statements in{" "}
                  <a href="null" className="formFieldTermsLink">
                    terms of service
                  </a>
                </label>
              </div>

              <div className="formField">
                <button className="formFieldButton" type="submit">Sign Up</button>{" "}
                <Link to="/login" className="formFieldLink">
                  I'm already a member
                </Link>
              </div>
            </form>
          </div>

          <Routes>
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/login" element={<SignInForm />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
