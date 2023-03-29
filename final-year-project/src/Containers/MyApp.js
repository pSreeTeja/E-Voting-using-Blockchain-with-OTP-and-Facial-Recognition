import React,{Component} from "react";
import Web3 from "web3";
import { ELECTION_ABI,ELECTION_ADDRESS } from "../config";
class MyApp extends React.Component{
    state={
        elections:{},
    }
    componentDidMount(){
        this.loadBlockChainData();
    }
    async loadBlockChainData(){
        const web3=new Web3(Web3.givenProvider || "http://localhost:7545");
        const network=await web3.eth.net.getNetworkType();
        const accounts=await web3.eth.getAccounts();
        const elections=new web3.eth.Contract(ELECTION_ABI,ELECTION_ADDRESS);
        const candidatesC=await elections.methods.candidatesCount().call();
        // this.setState({elections:elections});
        this.setState({candidatesC})
    
        console.log("CandidatesCount",this.state.candidatesC);
    }
    render(){
        return(
            <div>
                <h1>Hello from Component again</h1>
                <h1>{this.state.candidatesC}</h1>
            </div>
        )
    }
}
export default MyApp;