import React, { Component } from 'react';
import Web3 from 'web3';
import Election from "../build/Election.json"
import "../css/results.css"
class Results extends Component{
    state={
        isAuth:false,
        election:{},
        account:{},
        candidates:[],
    }
    componentDidMount=async ()=>{
        const res=await fetch("/isauth",{
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(async (res)=>{
            console.log("here")
            if(res.status===200){
                this.setState({isAuth:true});
                await this.loadWeb3();
                await this.loadBlockchainData();
            }
            else{
                window.location.assign("/")
            }
        })
    }
    async loadWeb3() {
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
        this.setState({candidates:[]})
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
            const candCount = await election.methods.candidatesCount().call()
            this.setState({ candCount })
            console.log("candidate Count"+candCount)
            for (var i = 1; i <= candCount; i++) {
                const candidate = await election.methods.candidates(i).call()
                this.setState({
                    candidates: [...this.state.candidates, candidate]
                })
            }
            console.log("Candidates Length:"+this.state.candidates.length)
            console.log(this.state.candidates)
        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }
    render(){
        return(
        <div className='resultsMainDiv'>
            <div className='navbar resultsNavbar'><span className="navbarTxt">Results</span></div>
            <div className='bottomResultsDiv'>
                {this.state.candidates.map((candidate)=>{
                    return (
                        <div key={this.state.candidates.indexOf(candidate)}>
                            <div className='eachCandidateDiv'>
                                <span className='partyNameResults'>{candidate.details}</span>
                                <span className='nameResults'>{candidate.name}</span>
                                <div className='voteCountResultsDiv'>
                                    <span>{candidate.voteCount}</span>
                                </div>
                            </div>
                        </div>
                )})}

            </div>
        </div>
        )
    }
}

export default Results;