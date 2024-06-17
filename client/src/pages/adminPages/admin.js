import { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import './admin.css'
//import Accordions from './Accordions';
export default function Admin() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [applicationId, setApplicationId] = useState("");
  const [applications, setApplications] = useState([]);
 
  const navigate = useNavigate();

 
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        console.log(cookies.jwt);
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
          console.log(data.status + " admin");
          removeCookie("jwt");
          navigate("/login");
        } 
      }
    };
    verifyUser();
    // fetchApplications();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <>
    
      <div className="hello">
        <div>
            <h1>Admin Dashboard</h1>
        </div>
        <div>
          <button type="button" onClick={logOut}>LogOut</button>
        </div>
      </div>
      <div className="threebox">
        <div className="box1"><Link className="applinks" to={{ pathname: '/admin/applications', search: '?status=approved' }}>Approved</Link></div>
        <div className="box2"><Link className="applinks" to={{ pathname: '/admin/applications', search: '?status=review' }}>Review</Link></div>
        <div className="box3"><Link className="applinks" to={{ pathname: '/admin/applications', search: '?status=rejected' }}>Rejected</Link></div>
      </div>
    </>
  );
}
