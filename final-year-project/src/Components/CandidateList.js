import React, { Component } from 'react';
import PartyImage from "../media/admin.png"
import "../css/components/candidateRow.css"
import "../css/components/candidateList.css"
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
    }
    handleInputChange=(e)=>{
        this.props.vote(e.target.id)
    }
    
    render(){
        return(
        <div className="candidateListMainDiv">
            <div className='candidateListTxtDiv'>
                <span className='candidateListTxt'>Candidate List</span>
            </div>
            <div className="canidateListRowsDiv">
                {this.props.candidates.map((item)=>{
                    return (
                        <div className="candidateRowMainDiv" key={this.props.candidates.indexOf(item)}>
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