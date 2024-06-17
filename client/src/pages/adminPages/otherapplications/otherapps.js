import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, Link ,useLocation} from "react-router-dom";
import { useCookies } from "react-cookie";

import axios from "axios";
import './reviewapps.css'
export default function OtherApps() {
   const [cookies, setCookie, removeCookie] = useCookies([]);
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const appStatus = searchParams.get('status');
    
      const fetchApplications = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:4000/applications",
            {},
            {
              withCredentials: true,
            }
          );
          
          const filteredApplications = data.filter(application => application.applicationStatus === appStatus);
          console.log("fetched: ", filteredApplications);
          setApplications(filteredApplications)

        } catch (err) {
          console.error("FETCH ERROR: ", err);
        }
      };
      const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };


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
        fetchApplications();
      }, [cookies, navigate, removeCookie]);
    
      const logOut = () => {
        removeCookie("jwt");
        navigate("/login");
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

      <div className='applicationdappa'>

        
      <div className="accordion" id="accordionExample">
        {applications.map((item, index) => {
          const collapseId = `collapse${index + 1}`; // Generate unique ID dynamically
          const isExpanded = expandedIndex === index;

          return (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    isExpanded ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => handleExpand(index)}
                  aria-expanded={isExpanded ? "true" : "false"}
                  aria-controls={collapseId}
                >
                  {item.title}
                </button>
              </h2>
              <div
                id={collapseId}
                className={`accordion-collapse collapse ${
                  isExpanded ? "show" : ""
                }`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>Description: </strong>
                  {item.description}
                </div>
               
              </div>
            </div>
          );
        })}
      </div>
      </div>
    
    </>
  )
}
