import React, { useState , useEffect} from "react";
import axios from "axios";
import './verifyPage.css'
export default function VerifyPage() {
  const [values, setValues] = useState("");
  const [outputValue, setOutputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


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
  const fetUserDetails= async ()=>{
    const { data } = await axios.get('http://localhost:4000/userdetails', {}, { withCredentials: true });
    console.log(data)
  }
  useEffect(()=>{
    fetUserDetails()

  },[])
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(searchQuery)
      const response = await axios.post('http://localhost:4000/api/run-python-script', {
        newabstract: searchQuery
      });
      //console.log(response.data.selectedPatents)
      setApplications(response.data.selectedPatents);
      //console.log(applications)
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <>
      <div className="mainexploredappa1">
        <div className="left-flex">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="search-bar1">
              <div className="search-box1">
                <input
                  placeholder="Searth the internet..."
                  type="text"
                  name="text"
                  id="searchInput"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>

              <div className="search-button1">
                <button id="srchbut" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="explore-box">
            {applications.map((application) => (
              <div className="selectedPatents">
                <div>
                  <div className="ptntile">{application.title}</div>
                  <div className="ptntauthors">{application.Inventors}</div>
                  <div className="paperlocation">
                    {" "}
                    {application.abstract}
                  </div>

                  <div className="download">
                    <a href={"https://gateway.pinata.cloud/ipfs/" + application.Cid }>
                      Download
                    </a>
                  </div>
                </div>
                <div className="score">
                <h4>Similarity</h4>
                  <h1>{(application.similarityscroe*100).toFixed(2)}%</h1></div>
              </div>
            ))}
          </div>
        </div>
     
      </div>
    </>
  );
}
