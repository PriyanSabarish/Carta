import React, {useState} from 'react';
import {Link} from "react-router-dom"
import {FaBars, FaTimes} from 'react-icons/fa';
import './navbar.css';
const Navbar =()=>{
    const [click,setClink]= useState(false);
    const toggleClick = () =>setClink(!click);
    return (
            <div class = "navbar">
                    <nav class = "nav-comp">
                        <div id='codeanal'><h1>
                            <span id='code'>Car</span>
                            <span id='anal'>ta</span>
                            </h1></div>
                            <ul className='nav-items'>
                                <li>
                                    <Link to={'/Home'}>Home</Link>
                                 </li>
                                 <li>
                                    <Link to={'/Search'}>Search</Link>
                                 </li>
                                 <li>
                                    <Link to={'/Apply'}>Apply</Link>
                                 </li>
                                 <li>
                                    <Link to={'/Profile'}>Profile</Link>
                                 </li>
                            </ul>

                        <div className='hamburger' onClick={toggleClick}>
                                    {!click ? (<FaBars size={20}/>) :(<FaTimes size={20}/>)}
                        </div>
                    </nav>
            </div>
    );
}
export default Navbar