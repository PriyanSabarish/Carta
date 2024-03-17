import  { useState,useEffect } from "react";
import { useNavigate ,Link} from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
//import Accordions from './Accordions';
export default function Admin() {
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [applications, setApplications] = useState([]);
  const [values,setValues] = useState({applicationID:"",title:"", description:"",  applicationStatus:"review"});
  const navigate = useNavigate();



  const handleAdd = (index, appId, title, desc) => {
    console.log("Approve clicked for item at index", index, "with title:", title, appId, desc);
    setValues({
      applicationID: appId,
      title: title,
      description: desc,
      applicationStatus: "approved"
    });
  };

  useEffect(() => {
    if (values.applicationStatus === "approved") {
      handleAddPatent();
    }
  }, [values]);

  const handleAddPatent = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/applyPatent", { ...values }, { withCredentials: true });
      if (data) {
        if (data.errors) { }
        else {
          console.log("applyPatent connection made");
        }
      }
    } catch (err) {
      console.log("applyPatent connection error: " + err);
    }
  };
  


  const handleRemove = (index, appId, title, desc) => {
    console.log("Approve clicked for item at index", index, "with title:", title, appId, desc);
    setValues({
      applicationID: appId,
      title: title,
      description: desc,
      applicationStatus: "rejected"
    });
  };

  useEffect(() => {
    if (values.applicationStatus === "rejected") {
      handleRemovePatent();
    }
  }, [values]);

  const handleRemovePatent = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/applyPatent", { ...values }, { withCredentials: true });
      if (data) {
        if (data.errors) { }
        else {
          console.log("removePatent connection made");
        }
      }
    } catch (err) {
      console.log("removePatent connection error: " + err);
    }
  };





  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/applications",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("fetched: ", data);
      setApplications(data);
    } catch (err) {
      console.error('FETCH ERROR: ',err);
    }
  }

  
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
            console.log(data.status +" admin")
            removeCookie("jwt");
            navigate("/login");
          } else
            console.log(data.user )
        }
      };
      verifyUser();
      fetchApplications();
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
    
    
<nav class="navbar navbar-expand-lg  navbar-dark bg-primary">

<div class="container-fluid">


  <div class="collapse navbar-collapse " id="navbarSupportedContent">

    <a class="navbar-brand col-sm-5 mt-2 mt-lg-0" href="#">
      <h2>Admin Dashboard</h2>
    </a>

   
   
  </div>
  
  <div class="d-flex align-items-center">

 
    

   
    
    <button type="button" class="btn btn-danger" onClick={logOut} data-mdb-ripple-init>LogOut</button>
      
      

      
    
  </div>

</div>

</nav>




    <div className="accordion" id="accordionExample">
      {applications.map((item, index) => {
        const collapseId = `collapse${index + 1}`; // Generate unique ID dynamically
        const isExpanded = expandedIndex === index;

        return (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${isExpanded ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleExpand(index)}
                aria-expanded={isExpanded ? 'true' : 'false'}
                aria-controls={collapseId}
              >
                {item.title}
              </button>
            </h2>
            <div
              id={collapseId}
              className={`accordion-collapse collapse ${isExpanded ? 'show' : ''}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>Description: </strong>{item.description}
              </div>
              {/* Add button */}
              <button type="button" className={`btn btn-primary btn-sm ${isExpanded ? '' : 'd-none'}`} onClick={() => handleAdd(index, item._id, item.title, item.description)}>Approve</button>
              {/* Remove button */}
              <button type="button" className={`btn btn-danger btn-sm ${isExpanded ? '' : 'd-none'}`} onClick={() => handleRemove(index, item._id, item.title, item.description)}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>



      


    </>
  )
}
