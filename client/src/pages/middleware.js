// Middleware.js
// import React, { useState , useEffect} from 'react'
// import { Link, Route ,useNavigate} from "react-router-dom";
// import axios from "axios";
// import "./middleware.css";
// import SignUpForm from './SignUpForm';
// import SignInForm from './SignInForm';
// import Navbar from '../components/navbar/navbar';

// function Middleware() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const getRole = async () => {
//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000",
//           {},
//           {
//             withCredentials: true,
//           }
//         );
//         data.role === "admin" ? navigate("/admin") : navigate("/home");
//       } catch (err) {
//         console.log("react middleware error: " + err);
//       }
//     };

//     getRole();
//   }, [navigate]);

//   return (
//     <div className="App">
//       <div className="appAside" />
//       <div className="appForm">
//         <div className="pageSwitcher">
//           <Link to="/login" className="pageSwitcherItem">
//             Sign In
//           </Link>
//           <Link exact to="/register" className="pageSwitcherItem">
//             Sign Up
//           </Link>
//         </div>

//         <div className="formTitle">
//           <Link to="/login" className="formTitleLink">
//             Sign In
//           </Link>{" "}
//           or{" "}
//           <Link exact to="/register" className="formTitleLink">
//             Sign Up
//           </Link>
//         </div>

//         {/* <Route path="/register" component={SignUpForm} />
//         <Route path="/login" component={SignInForm} /> */}
//       </div>
//     </div>
//   );
// }

// export default Middleware;











import React, { useState , useEffect} from 'react'
import { useNavigate , Link, Route, Routes} from 'react-router-dom';
import axios from "axios";
import Navbar from '../components/navbar/navbar';
import './middleware.css';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
export default function Middleware() {
    const navigate = useNavigate();
    const [noLogin,setLogin] = useState(false);
    const getRole = async () => {
        try {
           const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );

            if(data.role ==="admin"){
              navigate("/admin")}
            else if (data.role ==="users")
            {
              navigate("/home")}
           else{
                navigate("/")}
              
            
            
        } catch (err) {
            console.log("react middleware error: " + err);
        }
    };
    useEffect(() => {
        getRole();
    }, []);
  return (
   <>
    {
      !noLogin && 
      <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="pageSwitcher">
          <Link to="/login" className="pageSwitcherItem">
            Sign In
          </Link>
          <Link exact to="/register" className="pageSwitcherItem">
            Sign Up
          </Link>
        </div>

        <div className="formTitle">
          <Link to="/login" className="formTitleLink">
            Sign In
          </Link>{" "}
          or{" "}
          <Link exact to="/register" className="formTitleLink">
            Sign Up
          </Link>
        </div>
        <Routes>
        <Route path="/register" component={SignUpForm} />
        <Route path="/login" component={SignInForm} />
        </Routes>
      </div>
    </div>
    }
   </>
  )
}
