import  { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";



export default function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        console.log(cookies.jwt)
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          console.log(data.status + " user")
          removeCookie("jwt");
          navigate("/login");
        } else
          console.log(data.user)
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);


  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>

    
    <div>Home Page</div>
    
    
    </>
  )
}
