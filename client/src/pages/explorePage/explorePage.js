import React, { useState, useEffect } from 'react'
import './explore.css';
import axios from 'axios'
export default function Explore() {
  const [applications, setApplications] = useState([]);
  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/patents",
        {},
        {
          withCredentials: true,
        }
      );
      //console.log(data);
      setApplications(data);
    } catch (err) {
      console.error('FETCH ERROR: ',err);
    }
  }
  useEffect(()=>{
    fetchApplications();

  })
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };


  
  return (
    <>
     <div className='mainexploredappa'>
      <div className='left-flex'>
        <div className='search-bar'>
          <div className='search-box'></div>
              <div className='field'></div>
              <div className='category'></div>
              <div className='search-button'>
              <button id='srchbut'>Button</button>

              </div>
        </div>
        <div className='explore-box'>
          
              <div className='patents'>
                <div className='ptntile'>Responsible AI, SDGs, and AI Governance in Africa</div>
                <div className='ptntauthors'>Kutoma Wakunuma;George Ogoh;Damian Okaibedi Eke;Simi Akintoye</div>
                <div className='paperlocation'>2023 International Conference on Mobile Internet, Cloud Computing and Information Security (MICCIS)</div>
                <div className='year'>Year: 2023 | Conference Paper | Publisher: IEEE</div>
                <div className='download'>Download</div>
              </div>
              <div className='patents'>
                <div className='ptntile'>Responsible AI, SDGs, and AI Governance in Africa</div>
                <div className='ptntauthors'>Kutoma Wakunuma;George Ogoh;Damian Okaibedi Eke;Simi Akintoye</div>
                <div className='paperlocation'>2023 International Conference on Mobile Internet, Cloud Computing and Information Security (MICCIS)</div>
                <div className='year'>Year: 2023 | Conference Paper | Publisher: IEEE</div>
                <div className='download'>Download</div>
              </div>

              <div className='patents'>
                <div className='ptntile'>Responsible AI, SDGs, and AI Governance in Africa</div>
                <div className='ptntauthors'>Kutoma Wakunuma;George Ogoh;Damian Okaibedi Eke;Simi Akintoye</div>
                <div className='paperlocation'>2023 International Conference on Mobile Internet, Cloud Computing and Information Security (MICCIS)</div>
                <div className='year'>Year: 2023 | Conference Paper | Publisher: IEEE</div>
                <div className='download'>Download</div>
              </div>
     

        </div>
      </div>
      <div className='right-flex'>
      <div className='filter1'></div>
        <div className='filter2'></div>
      </div>
     </div>
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
      {/* <div className="accordion" id="accordionExample">
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
              
             
            </div>
          </div>
        );
      })}
    </div> */}
    </>
  )
}
