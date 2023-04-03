import React, { Component } from 'react';
import VoterIDSubmission from '../Components/VoterIDSubmission';
import VoterDetails from '../Components/VoterDetails';
import CandidateList from '../Components/CandidateList';
import Election from "../build/Election.json"
import Web3 from 'web3';
import VoteImg from "../media/voteImg.svg"
import "../css/user.css"
class User extends React.Component{
    state={
        statusCode:404,
        name:"",
        age:" ",
        gender:" ",
        voterID:" ",
        phno:"",

    }
    componentDidMount(){
        if(window.localStorage.getItem('voterID')!=null){
            this.setState(
                {   name:JSON.parse(window.localStorage.getItem('name')),
                    statusCode:200,
                    age:JSON.parse(window.localStorage.getItem('age')),
                    gender:JSON.parse(window.localStorage.getItem("gender")),
                    voterID:JSON.parse(window.localStorage.getItem("voterID")),
                }
            );
        }
    }
    setVoterDetails=(data,statusCode)=>{
        if(statusCode===200){
            console.log("DATA"+data.name);
            this.setState({statusCode:200,name:data.name,age:data.age,voterID:data.voterID,gender:data.gender,phno:"+91"+data.phno});
            console.log(this.state);
        }
    }
    
    render(){
        // console.log(this.state.candidates)
        // console.log(this.state.election);
        return(<div className="userMainDiv">
            <div className="navbar"><span className="navbarTxt">User</span></div>
            <div className="bottomDivUser bottomDiv">
                <div className="leftDivUser"> 
                    {this.state.statusCode===404 &&<VoterIDSubmission setVoterDetails={this.setVoterDetails}/>}
                    {this.state.statusCode===200 &&<VoterDetails name={this.state.name} 
                    age={this.state.age} gender={this.state.gender} voterID={this.state.voterID} />}

                </div>
                <div className="rightDivUser"> 
                    {this.state.statusCode===200 &&<CandidateList/>}
                    {this.state.statusCode===404 &&<img src={VoteImg}></img>}
                </div>
            </div>

        </div>)
    }
}
export default User;