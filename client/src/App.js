import React from "react";
import './App.css';
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/homePage/home";
import { Routes, Route, useLocation } from "react-router-dom";  
import Middleware from "./pages/middleware";
import Admin from "./pages/adminPages/admin";
import Application from "./pages/applyPage/application";
import Explore from "./pages/explorePage/explorePage";
import UserProfile from "./pages/userPage/userProfile";
import Naavbar from "./components/navbar/navbar";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";



function App() {
  const location = useLocation();

  // Array of paths where Navbar should not be rendered
  const hideNavbarPaths = ['/login', '/register', '/admin', '/'];

  // Check if the current path is in the hideNavbarPaths array
  const shouldRenderNavbar = !hideNavbarPaths.includes(location.pathname);
  


  return (
    <>
       {shouldRenderNavbar && <Naavbar />}
      <Routes>
        <Route exact path="/apply" element={<Application />} />
        <Route exact path="/userProfile" element={<UserProfile />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register" element={<SignUpForm />} />
        <Route exact path="/login" element={<SignInForm />} />
        <Route exact path="/" element={<Middleware />} />
      </Routes>
    </>
  );
}

export default App;
