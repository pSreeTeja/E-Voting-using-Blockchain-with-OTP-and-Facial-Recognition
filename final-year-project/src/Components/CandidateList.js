import React, { Component } from 'react';
import PartyImage from "../media/person.jpg"
import "../css/components/candidateRow.css"
import "../css/components/candidateList.css"
import Web3 from 'web3';
import Election from "../build/Election.json"
class CandidateList extends React.Component{
    state={
        // listItems:[
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"},
        // {partyName:"Bharatiya Janata Party",candidateName:"Narendra Modi"}]
        election:{},
        candidates:[],
        account:{},
    }
    handleInputChange=(e)=>{
        this.vote(e.target.id)
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
    vote= async(id)=>{
        window.location.assign("/verify/otp")
        await fetch("/getotp",
        { 
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                phno:JSON.parse(window.localStorage.getItem('phno'))
            })
        })
        // console.log("id:"+id)
        // console.log(this.state.account);
        // console.log(this.state.statusCode)
        // this.state.election.methods.vote(id).send(
        //     { 
        //         from: this.state.account , 
        //         gasLimit:100000
        //     }
        // )
        // .once('receipt', (receipt) => {
        //     window.location.assign("/");
        // })
    }
    
    render(){
        return(
        <div className="candidateListMainDiv">
            <div className='candidateListTxtDiv'>
                <span className='candidateListTxt'>Candidate List</span>
            </div>
            <div className="canidateListRowsDiv">
                {this.state.candidates.map((item)=>{
                    return (
                        <div className="candidateRowMainDiv" key={this.state.candidates.indexOf(item)}>
                            <div className='cRowImageDiv'>
                                <img className="partyImgCRow"src={PartyImage} alt="partyImage"></img>
                            </div>
                            <div className="cRowInfoDiv">
                                <div className='cRowLeftInfoDiv'>
                                    <span className='cRowPartyName'>{item.name}</span>
                                    <span className='cRowCandidatename'>{item.details}</span>
                                </div>
                                <button className='voteButton' id={item.id} onClick={this.handleInputChange}>VOTE</button>
                            </div>
                        </div>
                        )
                })}
            </div>

        </div>)
    }
}
export default CandidateList;