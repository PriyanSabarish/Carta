import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "./middleware.css";
import SignUpForm from "./SignUpForm";
import axios from 'axios';

const SignInForm = () => {
  
  
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
            <form className="formFields" onSubmit={handleLoginSubmit}>
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
                  onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
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
                  onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
                />
              </div>

              <div className="formField">
                <button type="submit" className="formFieldButton">Sign In</button>{" "}
                <Link to="/register" className="formFieldLink">
                  Create an account
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

export default SignInForm;
