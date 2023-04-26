import './App.css'; 
import React, { Component } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home  from "./Containers/Home"
import Admin  from "./Containers/Admin"
import User  from "./Containers/User"
import NewCandidate from "./Containers/NewCandidate"
import OTP from "./Containers/OTP"
import FacialRecognition from "./Containers/FacialRecogition"
import NotFound from './Containers/404NotFound';
import VoteDone from './Containers/VoteDone';
import Results from "./Containers/Results"
import Web3 from 'web3';
import Election from "./build/Election.json"

class App extends React.Component {
  state={
    election:{},
    account:{},
  }
  componentDidMount=async()=>{
    console.log("componentDidMount")
    await this.loadWeb3() 
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    console.log("loadWeb3")
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}
async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Election.networks[networkId]
    if(networkData) {
        const election = new web3.eth.Contract(Election.abi, networkData.address)
        this.setState({ election })
        console.log(election)
    } else {
        window.alert('Election contract not deployed to detected network.')
    }
}
handleVote=(id,voterid)=>{
  this.state.election.methods.vote(id).send({from: this.state.account})
  .once('receipt', async (receipt) => {
      await fetch("/markvoted",
      { 
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            voterID:JSON.parse(voterid)
        })
      }).then(()=>{
        console.log("inside then")
        window.location.assign("/verify/votedone");
      })
  })
  
}

  render(){
    return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/user" element={<User/>}/>
            <Route exact path="/admin" element={<Admin/>}/>
            <Route exact path="/admin/addcandidate" element={<NewCandidate/>}/>
            <Route exact path="/verify/otp" element={<OTP/>}/>
            <Route exact path="/verify/facialrecog" element={<FacialRecognition handleVote={this.handleVote}/>}/>
            <Route exact path="/verify/votedone" element={<VoteDone/>}/>
            <Route exact path="/admin/results" element={<Results/>}/>
            <Route exact path="/*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
