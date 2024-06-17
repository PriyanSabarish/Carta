import React, {useEffect, useState} from 'react'
import { useNavigate , } from 'react-router-dom';
import './userProfile.css';
import {Link,NavLink} from "react-router-dom"
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
export default function UserProfile() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [userId, setUserId] = useState("");
  const [userdata, setUserData] = useState([{
    fullname: " ",
    email:"",
    location: ""
  }]);
  const decodeJWT = async () => {
    if (cookies.jwt) {
      const decoded = jwtDecode(cookies.jwt);
      setUserId(decoded.userId);
      await fetUserDetails(decoded.userId)
    }
  };

  useEffect(() => {
    decodeJWT(); 
  }, [cookies.jwt]);

  const fetUserDetails= async (uid)=>{
    console.log(uid)
    const { data } = await axios.get('http://localhost:4000/userdetails', {}, { withCredentials: true });
    setUserData(data);
    const ud = data.filter((uds) => uds._id=== uid);
    setUserData(ud)
    
    
  }
  const logOut = () => {
    removeCookie('jwt');
    navigate("/login");
  };
  return (
    <>
    <div className='maindappa'>
        <div className='user-container'>
           <div className='userNavigations'>
            <ul className='usernav-items'>
                                   <li>
                                   <NavLink to={'/userProfile/myprofile'} >My Profile</NavLink>
                                  </li>
                                  <li>
                                   <NavLink to={'/userProfile/applications'} activeClassName="active">Applications</NavLink>
                                  </li>
                                  <li>
                                   <NavLink to={'/userProfile/patents'} activeClassName="active">Patents</NavLink>
                                  </li>
                                  <li>
                                   <NavLink to={'/userProfile/saved'} activeClassName="active">Saved</NavLink>
                                  </li>
                                  <li>
                                   <NavLink to={'/userProfile/uploads'} activeClassName="active">Settings</NavLink>
                                  </li>
                                </ul>
           </div>
           <div className='contentNavigation'>
            <div className='myprofile'>My Profile</div>
            <div className='name-details'>
                  <div className='imageNamegrp'>
                  <div className='proimage'></div>
                  <div className='Namelocaton'> 
                    <div className='Name'>{userdata[0].fullname}</div>
                    <div className='Location'>{userdata[0].location}</div>
                  </div>
                  </div>
                <button className='editbutton'>Edit</button>
            </div>
            
            <div className='persondet'>
            <div className='personalinfo'>Personal information</div>
                <div className='personfirstrow'>
                  <div className='item1'>
                    <div className='itemheading'>Username</div>
                    <div className='itemvalue'>{userdata[0].fullname}</div>
                    
                  </div>
                  <div className='item2'>
                    <div className='itemheading'>Email Address</div>
                    <div className='itemvalue'>{userdata[0].email}</div>
                  </div>
                  <button className='editbutton'>Edit</button>
                </div>
                <div className='personsecondrow'>
                <div className='item1'>
                    <div className='itemheading'>Phone</div>
                    <div className='itemvalue'>+91 9994834320</div>
                </div>
                  <div className='item2'>
                    <div className='itemheading'>Location</div>
                    <div className='itemvalue'>{userdata[0].location}</div>
                  </div>
                </div>
            </div>
            {/* <div className='language'>Language</div>
            <button className='choooselang'>English</button> */}
            </div> 
        </div>
  
    </div>
    
    
    </>
  )
}
