import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, Link ,useLocation} from "react-router-dom";
import { useCookies } from "react-cookie";
import Web3 from "web3";
import abi from "D:/fnlyr proj/patentblockchain/client/src/blockchain/build/contracts/Patents.json";
import axios from "axios";
import './reviewapps.css'
export default function AdminApps() {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [applicationId, setApplicationId] = useState("");
    const [applications, setApplications] = useState([]);
    const [web3, setWeb3] = useState(null);
    const [contractAddress, setContractAddress] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const appStatus = searchParams.get('status');
  
    const [values, setValues] = useState({
        applicationID: "",
        title: "",
        description: "",
        applicationStatus: "review",
        userId:"",
        Cid:"",
        transactionhash:"",
        abstract:"",
        Inventors:""
      });

      useEffect( ()=>{
          webConnect();
      },[])

      const webConnect = async () => {
        try {
          if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            window.ethereum.enable();
            setWeb3(web3Instance);
    
            const networkId = await web3Instance.eth.net.getId();
            if (abi.networks[networkId]) {
              const deployedNetwork = abi.networks[networkId];
              setContractAddress(deployedNetwork.address);
              console.log("web connect ", contractAddress);
            } else {
              console.error("Contract not deployed on this network.");
            }
          } else {
            console.error("Please install MetaMask or a compatible Web3 provider.");
          }
        } catch (error) {
          console.error("Error connecting to Web3:", error);
        }
      };
    
      const buyTheCoin = async () => {
        if (web3 && contractAddress) {
          console.log("aaaaaaaaa");
          const contract = new web3.eth.Contract(abi.abi, contractAddress);
          try {
            console.log(values.title, values.description);
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const newabstract = truncateString(values.abstract,15)
            await contract.methods
              .changeValue(values.title, newabstract,values.Inventors,values.userId,values.Cid,values.applicationID)
              .send({
                // Pass inputValue as argument
                from: accounts[0],
              });
          } catch (error) {
            console.error("Error updating counter:", error);
          }
        } else {
          console.error("Please enter a valid value and connect MetaMask.");
        }
      };
    

    const handleAdd = (index, appId, title, desc,userid,cid,txhash,abstract,Inventors) => {
        // console.log(
        //   "Approve clicked for item at index",
        //   index,
        //   "with title:",
        //   title,
        //   appId,
        //   desc
        // );
        setValues({
          applicationID: appId,
          title: title,
          description: desc,
          applicationStatus: "approved",
          userId:userid,
          Cid:cid,
          transactionHash:txhash,
          abstract:abstract,
          Inventors:Inventors
        });

      
      };
    
      useEffect(() => {
        if (values.applicationStatus === "approved") {
          handleAddPatent();
        }
      }, [values]);
    
      const handleAddPatent = async () => {
        try {
            
            await buyTheCoin();

          const { data } = await axios.post(
            "http://localhost:4000/applyPatent",
            { ...values },
            { withCredentials: true }
          );
          if (data) {
            if (data.errors) {
            } else {
              console.log("applyPatent connection made");
              setApplicationId(values.applicationID);
              try {
                const { data } = await axios.put(
                  `http://localhost:4000/applications/${values.applicationID}`,
                  { ...values },
                  { withCredentials: true }
                );
                if (data) {
                  if (data.errors) {
                  } else {
                    console.log("applicationStatus update connection successful");
                  }
                }
              } catch (err) {
                console.log("application status update connection error");
              }
            }
          }
        
        } catch (err) {
          console.log("applyPatent connection error: " + err);
        }
        
      };
    
      const handleRemove = (index, appId, title, desc) => {
        console.log(
          "Remove clicked for item at index",
          index,
          "with title:",
          title,
          appId,
          desc
        );
        setValues({
          applicationID: appId,
          title: title,
          description: desc,
          applicationStatus: "rejected",
        });
      };
    
      useEffect(() => {
        if (values.applicationStatus === "rejected") {
          handleRemovePatent();
        }
      }, [values]);
    
      const handleRemovePatent = async () => {
        try {
          const { data } = await axios.put(
            `http://localhost:4000/applications/${values.applicationID}`,
            { ...values },
            { withCredentials: true }
          );
          if (data) {
            if (data.errors) {
            } else {
              console.log("applicationStatus remove update connection successful");
            }
          }
        } catch (err) {
          console.log("applicationStatus remove update connection error");
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
    

      function truncateString(str, maxLength) {
        if (str.length > maxLength) {
          return str.slice(0, maxLength - 3) + '...';
        } else {
          return str;
        }
      }


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
                {/* Add button */}
                <button
                  type="button"
                  className={`btn btn-primary btn-sm ${
                    isExpanded ? "" : "d-none"
                  }`}
                  onClick={() =>
                    handleAdd(index, item._id, item.title, item.description, item.userId,item.Cid,item.
                      transactionHash,item.
                      abstract,item.Inventors)
                  }
                >
                  Approve
                </button>
                {/* Remove button */}
                <button
                  type="button"
                  className={`btn btn-danger btn-sm ${
                    isExpanded ? "" : "d-none"
                  }`}
                  onClick={() =>
                    handleRemove(index, item._id, item.title, item.description)
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    
    </>
  )
}
