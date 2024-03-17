import React from 'react'
import { useNavigate } from 'react-router-dom';
import './userProfile.css';
import {Link} from "react-router-dom"
import { useCookies } from "react-cookie";
export default function UserProfile() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

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
                                   <Link to={'/home'}>My Profile</Link>
                                  </li>
                                  <li>
                                   <Link to={'/explore'}>Applications</Link>
                                  </li>
                                  <li>
                                   <Link to={'/apply'}>Patents</Link>
                                  </li>
                                  <li>
                                   <Link to={'/userProfile'}>Uploads</Link>
                                  </li>
                                  <li>
                                   <Link to={'/userProfile'}>Saved</Link>
                                  </li>
                                </ul>
           </div>
           <div className='contentNavigation'>
            <div className='myprofile'>My Profile</div>
            <div className='name-details'>
                  <div className='imageNamegrp'>
                  <div className='proimage'></div>
                  <div className='Namelocaton'> 
                    <div className='Name'>Sam Anderson</div>
                    <div className='Location'>Puducherry, India</div>
                  </div>
                  </div>
                <button className='editbutton'>Edit</button>
            </div>
            <div className='personalinfo'>Personal information</div>
            <div className='persondet'>
                <div className='personfirstrow'>
                  <div className='item1'>
                    <div className='itemheading'>Username</div>
                    <div className='itemvalue'>Samanderson</div>
                    
                  </div>
                  <div className='item2'>
                    <div className='itemheading'>Email Address</div>
                    <div className='itemvalue'>samanderson23@gmail.com</div>
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
                    <div className='itemvalue'>Puducherry</div>
                  </div>
                </div>
            </div>
            <div className='language'>Language</div>
            <button className='choooselang'>English</button>
            </div> 
        </div>
  
    </div>
    
    
    </>
  )
}
