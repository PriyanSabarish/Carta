import React, { useState, useEffect } from 'react'
import { Link} from "react-router-dom";
import './explore.css';
import axios from 'axios'
export default function Explore() {
  const [applications, setApplications] = useState([]);
  const [author, setAccepted] = useState([]);
  const [publication, setRejected] = useState([]);
  const [affiliation, setReview] = useState([]);
  const [location, setLocation] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [userIdd, setUserId] = useState("");
  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/patents",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setApplications(data);
    } catch (err) {
      console.error('FETCH ERROR: ',err);
    }
  }
  useEffect(()=>{
    fetchApplications();

  },[])
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
            {title} 
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
    <>
     <div className='mainexploredappa'>
      <div className='left-flex'>
        <div className='search-bar'>
          <div className='search-box'>
          <input placeholder="Searth the internet..." type="text" name="text" id="searchInput" value={searchQuery}
        onChange={handleSearchInputChange}/>
          </div>
              <button className='field'  id="fieldbutton">
                    Field
              </button>
              <div className='search-button'>
              <button id='srchbut'>Search</button>
              </div>
        </div>
        <div className='explore-box'>
          {applications .filter(application => application.title.toLowerCase().includes(searchQuery.toLowerCase())).map(application => (
                  <div className='patents'>
                  <div className='ptntile'><Link className="appalinks" to={{ pathname: '/post/', search: `?id=${application._id}` }}>{application.title}</Link></div>
                  <div className='ptntauthors'>{application.Inventors}</div>
                  <div className='paperlocation'> {application.abstract}</div>
                  {/* <div className='year'>Year: 2023 | Conference Paper | Publisher: IEEE</div> */}             
                  <div className='download'><a href={"https://gateway.pinata.cloud/ipfs/" + application.Cid}>View Paper</a></div>
                </div>
            ))}              
        </div>
      </div>
      <div className='right-flex'>
        <div className='filter1'>
        <div className='accords'>
              <Accordion title="Author" applications={author} />
              <Accordion title="Publication" applications={publication} />
              <Accordion title="Affiliation" applications={affiliation} />
              <Accordion title="Location" applications={affiliation} />
              <Accordion title="Organization" applications={affiliation} />
              <Accordion title="Year" applications={affiliation} />
              
        </div>
        


        </div>
      </div>
     </div>
    </>
  )
}
