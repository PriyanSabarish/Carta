import React, { useState, useEffect } from 'react';
import { useNavigate, Link,NavLink, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import 'D:/fnlyr proj/patentblockchain/client/src/pages/userPage/userProfile.css';

export default function UserSaved() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [acceptedApplications, setAccepted] = useState([]);
  const [rejectedApplications, setRejected] = useState([]);
  const [reviewApplications, setReview] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [userIdd, setUserId] = useState('');
  const searchParams = new URLSearchParams(location.search);

  const fetchApplications = async (userId) => {
    try {
      const { data } = await axios.get('http://localhost:4000/applications', {}, { withCredentials: true });

      const filteredApplications = data.filter((application) => application.userId === userId);
      const accppted = filteredApplications.filter((application) => application.applicationStatus === 'approved');
      const rejected = filteredApplications.filter((application) => application.applicationStatus === 'rejected');
      const review = filteredApplications.filter((application) => application.applicationStatus === 'review');
      setAccepted(accppted);
      setRejected(rejected);
      setReview(review);
    } catch (err) {
      console.error('FETCH ERROR: ', err);
    }
  };

  const handleExpand = (title) => {
    setExpandedIndex((prevIndex) => (prevIndex === title ? null : title));
  };

  const logOut = () => {
    removeCookie('jwt');
    navigate('/login');
  };

  useEffect(() => {
    const decodeJWT = async () => {
      if (cookies.jwt) {
        const decoded = jwtDecode(cookies.jwt);
        setUserId(decoded.userId);

        await fetchApplications(decoded.userId);
      }
    };
    decodeJWT();
  }, [cookies.jwt]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/login');
      } else {
        const { data } = await axios.post('http://localhost:4000', {}, { withCredentials: true });
        if (!data.status) {
          removeCookie('jwt');
          navigate('/login');
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const Accordion = ({ title, applications }) => {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className={`accordion-button ${expandedIndex === title ? '' : 'collapsed'}`}
            type="button"
            onClick={() => handleExpand(title)}
            aria-expanded={expandedIndex === title ? 'true' : 'false'}
            aria-controls={`collapse${title}`}
          >
            {title} ({applications.length})
          </button>
        </h2>
        <div
          id={`collapse${title}`}
          className={`accordion-collapse collapse ${expandedIndex === title ? 'show' : ''}`}
        >
          <div className="accordion-body">
            {applications.map((app, index) => (
              <div key={index} className="application-item">
                <p>{app.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="maindappa">
      <div className="user-container">
        <div className="userNavigations">
          <ul className="usernav-items">
          <li>
                                   <NavLink to={'/userProfile/myprofile'} activeClassName="active">My Profile</NavLink>
                                  </li>
                                  <li>
                                   <NavLink to={'/userProfile/applications'} activeClassName="active">Applications</NavLink>
                                  </li>
                                  <li>
                                   <NavLink to={'/userProfile/patents'} activeClassName="active">Patents</NavLink>
                                  </li>
                                  <li>
                                   <NavLink to={'/userProfile/saved'} activeClassName="active">Saved</NavLink>
                                  </li>
                                  <li>
                                   <NavLink to={'/userProfile/uploads'} activeClassName="active">Settings</NavLink>
                                  </li>
          </ul>
        </div>
        <div className="user-applications">
        <div className='apptitle'> Applications</div>
          <div className='accords'>
              <Accordion title="Accepted" applications={acceptedApplications} />
              <Accordion title="Rejected" applications={rejectedApplications} />
              <Accordion title="Review" applications={reviewApplications} /></div>
        </div>
      </div>
    </div>
  );
}
