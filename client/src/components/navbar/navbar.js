import React, {useState} from 'react';
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
const Naavbar =()=>{
    const [click,setClink]= useState(false);
    const toggleClick = () =>setClink(!click);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    
    const logOut = () => {
      removeCookie('jwt');
      navigate("/login");
    };
    return (
         <>

       <div class = "navbarr" id='navbarr'>
                   <nav class = "nav-comp" id='nav-comp'>
                    
                       <div id='codeanal'><h1>
                           <span id='code'>Car</span>
                           <span id='anal'>ta</span>
                           </h1>
                        </div>
                           <div className='right-items' id='right-items'>
                              <div className='navdiv-items' id='navdiv-items'>
                               <ul className='nav-items' id='nav-items'>
                                   <li>
                                   <Link to={'/home'}>Home</Link>
                                  </li>
                                  <li>
                                   <Link to={'/explore'}>Explore</Link>
                                  </li>
                                  <li>
                                   <Link to={'/apply'}>Apply</Link>
                                  </li>
                                  <li>
                                   <Link to={'/userProfile'}>Profile</Link>
                                  </li>
                                </ul>
                              </div>
                              <div className='right-icons'>
                                      <h3 className='noticon'><IoMdNotificationsOutline /></h3>
                                      <h3 className='usericon'><FaRegUser onClick={logOut}/></h3>
                              </div>
                             </div>
               </nav>
        </div>

         </>


);
}
export default Naavbar


//   <Navbar expand="lg" className="bg-body-tertiary">
//       <Container fluid>
//         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link href="#action1">Home</Nav.Link>
//             <Nav.Link href="#action2">Link</Nav.Link>
//             <NavDropdown title="Link" id="navbarScrollingDropdown">
//               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action4">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action5">
//                 Something else here
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link href="#" disabled>
//               Link
//             </Nav.Link>
//           </Nav>
          
            
//             <Button variant="outline-danger">LogOut</Button>
          
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
         


