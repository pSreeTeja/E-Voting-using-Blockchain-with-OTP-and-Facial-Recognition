import React, { Component } from 'react';
import "../css/components/voterIdSubmission.css"
// import {ELECTION_ADDRESS,ELECTION_ABI} from "../config";
// import Election from "../build/Election.json";
// import Web3 from 'web3';

class VoterIDSubmission extends React.Component{
    state={
        voterID:"",
        statusCode:404,
    }


    apiForVoterDetails=async ()=>{
        try{
            const response=await fetch("/getvoterdetails",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    voterID:this.state.voterID
                })
            })
            const data=await response.json();
            this.state.statusCode=200;
            return data;
        }
        catch(err){
            this.state.statusCode=404;
            console.log(err);
        }
    }
    getVoterDetails=()=>{
        window.localStorage.setItem('voterID',JSON.stringify(this.state.voterID))
        this.apiForVoterDetails().then((data)=>{
            console.log(data)
            window.localStorage.setItem('voterID',JSON.stringify(data[0].voterID))
            window.localStorage.setItem('name',JSON.stringify(data[0].name))
            window.localStorage.setItem('age',JSON.stringify(data[0].age))
            window.localStorage.setItem('gender',JSON.stringify(data[0].gender))
            window.localStorage.setItem('phno',JSON.stringify(data[0].phno))
            this.props.setVoterDetails(data[0],this.state.statusCode);
        })
    } 


    render(){  
        return(
        <div className='voterIDSubMainDiv'>
            <div className="passwordTxtDivVIDSub">         
                <span className='voterIDTxtVIDSub'>Enter your Voter ID</span>                 
            </div>
            <input className='inputForPassVIDSub' onChange={(e)=>{this.setState({voterID:e.target.value})}}></input>
            <button className='submitButtonVIDSub' onClick={this.getVoterDetails}>Submit</button>
        </div>
        )
    }
}

export default VoterIDSubmission;