import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Lottery from "./contracts/Lottery.json";
import Manager from "./components/Manager";
import Players from "./components/Players";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import "./App.css";
import {Route , Link} from "react-router-dom"
import Footer from "./components/Footer";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [address, setAddress] = useState(null);
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        // console.log(web3.eth.net.getId())
        
        const networkId = await web3.eth.net.getId();              // FETCHES THE NETWORK ID SELECTED IN METAMASK        

        const deployedNetwork = Lottery.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setAddress(deployedNetwork.address);
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <>
    <Navbar/>
    
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12  text-center">
        <img  className="image img-fluid "src="./lottery.png"/>
        </div>
      
      </div>
  
    </div>
      <Route exact path="/">
        <Intro></Intro>
      </Route>
      <Route path="/manager">
        <Manager state={state} />
      </Route>
      <Route path="/players">
        <Players address={address} state={state} />
      </Route>
      <Footer/>
      </>
  );
};
export default App;
