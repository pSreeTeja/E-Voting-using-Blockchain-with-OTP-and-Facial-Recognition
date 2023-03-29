import React, { Component } from 'react';
import VoterIDSubmission from '../Components/VoterIDSubmission';
import VoterDetails from '../Components/VoterDetails';
import CandidateList from '../Components/CandidateList';
import Election from "../build/Election.json"
import Web3 from 'web3';
import "../css/user.css"
class User extends React.Component{
    state={
        statusCode:404,
        name:"",
        age:" ",
        gender:" ",
        voterID:" ",
        election:{},
        candidates:[],
    }
    setVoterDetails=(data,statusCode)=>{
        if(statusCode===200){
            console.log("DATA"+data.name);
            this.setState({statusCode:200,name:data.name,age:data.age,voterID:data.voterID,gender:data.gender});
            console.log(this.state);
        }
    }
    
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
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
            console.log(candCount)
            for (var i = 1; i <= candCount; i++) {
                const candidates = await election.methods.candidates(i).call()
                if(candidates.election_id === this.state.id){
                    this.setState({
                        candidates: [...this.state.candidates, candidates]
                    })
                }
            }
            console.log(this.state.candidates)
        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }
    vote=(id)=>{
        // // this.setState({ loading: true })
        // console.log(id)
        console.log(this.state.statusCode)
        this.state.election.methods.vote(id).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.setState({ loading: false })
            window.location.assign("/");
        })
    }
    render(){
        // console.log(this.state.candidates)
        // console.log(this.state.election);
        return(<div className="userMainDiv">
            <div className="headingDivUser"><span className="userTxtUser">User</span></div>
            <div className="bottomDivUser ">
                <div className="leftDivUser"> 
                    {this.state.statusCode===404 &&<VoterIDSubmission setVoterDetails={this.setVoterDetails}/>}
                    {this.state.statusCode===200 &&<VoterDetails name={this.state.name} 
                    age={this.state.age} gender={this.state.gender} voterID={this.state.voterID} />}

                </div>
                <div className="rightDivUser"> 
                    {this.state.statusCode===200 &&<CandidateList candidates={this.state.candidates} vote={this.vote}/>}

                </div>
            </div>

        </div>)
    }
}
export default User;