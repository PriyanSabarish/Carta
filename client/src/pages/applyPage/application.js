import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./application.css";
import Web3 from "web3";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import abi from "D:/fnlyr proj/patentblockchain/client/src/blockchain/build/contracts/Applications.json";

export default function Application() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    applicationStatus: "review",
    userId: "default",
    Cid: "",
    transactionash: "",
    abstract: "",
    Inventors: "",
  });


  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);

    
  };

  const handleClickSuggestion = (suggestion) => {
    setInput(suggestion);
    setFilteredSuggestions([]);
  };
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contractAddress, setContractAddress] = useState("");
  const [inputValue, setInputValue] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [userIdd, setUserId] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
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
  const uploadIPFS = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `a91f23411a9fd2943d70`,
            pinata_secret_api_key: `8444fd70af699118305a2def806bc2010c258c0d9a7c3251ceb29aa50699f805`,
            "Content-Type": "multipart/form-data",
          },
        });
        const fileUrl =
          "https://gateway.pinata.cloud/ipfs/" + resFile.data.IpfsHash;
        setCid(resFile.data.IpfsHash);
        setValues({
          ...values,
          Cid: resFile.data.IpfsHash,
        });
        console.log(fileUrl);

        if(fileUrl){
          alert("File uploaded to Ipfs storage");
        }
      }
    } catch (err) {
      console.log("file upload error", err);
    }
  };
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
    } else {
      return str;
    }
  }
  const buyTheCoin = async () => {
    if (web3 && contractAddress) {
      const contract = new web3.eth.Contract(abi.abi, contractAddress);
      console.log(values.Inventors+"from transaction")
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const newabstract = truncateString(values.abstract,15)
        console.log("new abstract: ", newabstract)
        const transaction = await contract.methods
          .changeValue(values.title, newabstract,values.Inventors,userIdd,values.Cid)
          .send({
            // Pass inputValue as argument
            from: accounts[0],
          });

        setValues({
          ...values,
          transactionHash: transaction.transactionHash,
        });
        console.log("transactionHash", transaction.transactionHash);
      } catch (error) {
        console.error("Error updating counter:", error);
      }
    } else {
      console.error("Please enter a valid value and connect MetaMask.");
    }
  };

  const makeTransaction = async () => {
    if (webConnect()) {
      console.log("web connection successfull");
      await buyTheCoin();
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setValues({
        ...values,
        userId: userIdd,
      });
      console.log(values)
      const { data } = await axios.post(
        "http://localhost:4000/apply",
        { ...values },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
        } else {

          console.log("application uploaded");
          alert("application uploaded");
        }
      }
    } catch (err) {
      console.log("Apply connection error: " + err);
    }
  };

  useEffect(() => {
    const decodeJWT = () => {
      if (cookies.jwt) {
        const decoded = jwtDecode(cookies.jwt);
        // console.log(decoded.userId);
        setUserId(decoded.userId);
        console.log(userIdd);
      }
    };
    decodeJWT();
  }, [cookies.jwt]);

  return (
    <div className="Applycontainer">
      <div className="Patentcontainer">
        <h2 className="bigit">Patent Apply</h2>
        <form
          onSubmit={(e) => {
            handleLoginSubmit(e);
          }}
          className="patentapplication"
        >
          <div className="everyapp">
            <div className="left-side">
              <div>
                <label htmlFor="title">Title</label>
                <input
                  className="ayyo"
                  type="text"
                  name="title"
                  placeholder="title"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="abstract">Abstract</label>
                <input
                className="ayyo"
                  type="text"
                  name="abstract"
                  placeholder="abstract"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div>
            
                <label htmlFor="Inventor">Inventor</label>
                <input
                className="ayyo"
                  type="text"
                  name="Inventors"
                  placeholder="Inventors"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
       
              </div>
            </div>
            <div className="right-side">
              <div>
                <label htmlFor="description">Description</label>
              </div>
              <textarea
              className="ayyo"
                id="address"
                name="description"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                rows="4"
                placeholder="Patent description"
              ></textarea>

              <input
              
                className="ayyo"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="thebuttons">
          <button type="button" onClick={uploadIPFS} className="sabba">
            Upload
          </button><br></br>
          <button type="button" onClick={makeTransaction} className="sabba">
            Make transaction
          </button><br></br>
          <button type="submit" className="patenSubmit">
            Submit
          </button>
        
          </div>
          </form>
      </div>
    </div>
  );
}
