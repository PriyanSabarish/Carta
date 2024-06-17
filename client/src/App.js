import React from "react";
import './App.css';
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/homePage/home";
import { Routes, Route, useLocation } from "react-router-dom";  
import Middleware from "./pages/middleware";
import UserApp from "./pages/userPage/userapp/userapp";
import Admin from "./pages/adminPages/admin";
import ReviewApps from "./pages/adminPages/reviewapps"
import OtherApps from "./pages/adminPages/otherapplications/otherapps"
import Application from "./pages/applyPage/application";
import Explore from "./pages/explorePage/explorePage";
import UserProfile from "./pages/userPage/userProfile";
import Naavbar from "./components/navbar/navbar";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import VerifyPage from "./pages/verifyPage/verifyPage";
import UserPatent from "./pages/userPage/userpat/userpatent";
import UserSaved from "./pages/userPage/usersav/usersaved";
import PostPage from "./pages/postPage/postpage";


function App() {
  const location = useLocation();

  // Array of paths where Navbar should not be rendered
  const hideNavbarPaths = ['/login', '/register', '/admin', '/' , '/admin/applications'];

  // Check if the current path is in the hideNavbarPaths array
  const shouldRenderNavbar = !hideNavbarPaths.includes(location.pathname);
  
  function AppStatus(){
   
      const { search } = useLocation();
      const params = new URLSearchParams(search);
      const status = params.get('status');

      // Dynamically render the component based on status value
      switch (status) {
        case 'approved':
          return <OtherApps />;
        case 'review':
          return <ReviewApps/>;
        case 'rejected':
          return <OtherApps />;
        default:
          return <ReviewApps />;
      }
   
  }


  return (
    <>
       {shouldRenderNavbar && <Naavbar />}
      <Routes>
        <Route exact path="/apply" element={<Application />} />
        <Route exact path="/userProfile" element={<UserProfile />} />
        <Route exact path="/userProfile/myprofile" element={<UserProfile />} />
        <Route exact path="/userProfile/patents" element={<UserPatent />} />
        <Route exact path="/userProfile/applications" element={<UserApp />} />
        <Route exact path="/userProfile/saved" element={<UserSaved />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/verify" element={<VerifyPage />} />
        <Route exact path="/admin/applications" element={<AppStatus/>} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post/" element={<PostPage />} />
        
        <Route exact path="/register" element={<SignUpForm />} />
        <Route exact path="/login" element={<SignInForm />} />
        <Route exact path="/" element={<Middleware />} />
      </Routes>
    </>
  );
}

export default App;
