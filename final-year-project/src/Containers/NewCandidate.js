import React, { Component } from 'react';
import "../css/newCandidate.css"
import {ELECTION_ADDRESS,ELECTION_ABI} from "../config";
import Election from "../build/Election.json";
import Web3 from 'web3';

class NewCandidate extends React.Component{
    state={
        account:{},
        election:{}, 
        candidate_name:"",
        candidate_details:"",
    }

    async componentWillMount() {
        const res=await fetch("/isauth",{
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            console.log("here")
            if(res.status!=200){
                window.location.assign("/");
            }
        })
        await this.loadWeb3()
        await this.loadBlockChain()
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
    async loadBlockChain(){
        console.log("loadBlockChain")
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Election.networks[networkId]
        if(networkData) {
            console.log(Election.abi);
            console.log(networkData.address)
            const election = new web3.eth.Contract(Election.abi, networkData.address)
            console.log(election)
            this.setState({ election })
        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }
    addCandidates() {
        console.log(this.state.candidate_details);
        this.state.election.methods.addCandidate(this.state.candidate_name, this.state.candidate_details).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            console.log(receipt);
          window.location.assign("/admin");
        })
    }
    handleSubmit=(e)=>{
        if(this.state.candidate_name.trim().length!=0 && this.state.candidate_details.trim().length!=0){
            e.preventDefault();
            this.addCandidates();
        }
    }
    

    render(){
        return(
            <div className="newCandidateMainDiv">
                <div className="navbar">
                    <span className="navbarTxt">New Candidate</span>
                </div>
                <div className="bottomDiv newCandBottomDiv">
                    <div className='newCandDetailsBoxDiv'>
                        <div className='topAndBottomDiv'>
                            <span className='txtsInNewCand'>Candidate Name</span>
                            <input className="newCandInputs" id="candidate_name" onChange={(e)=>{this.setState({candidate_name:e.target.value})}}></input>
                        </div>
                        <div className='topAndBottomDiv'>
                            <span className='txtsInNewCand'>Candidate Details</span>
                            <input className="newCandInputs" id="candidate_details" onChange={(e)=>{this.setState({candidate_details:e.target.value})}}></input>
                        </div>
                        <button className='submitBtn btnNewCand' onClick={this.handleSubmit}>Add</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default NewCandidate;