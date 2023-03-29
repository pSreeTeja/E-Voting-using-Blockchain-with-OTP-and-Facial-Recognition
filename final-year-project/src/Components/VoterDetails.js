import React, { Component } from 'react';
import "../css/components/voterDetails.css"
class VoterDetails extends React.Component{
    render(){
        return(
        <div className="voterDetailsMainDiv">
            <div className="voterDTopDiv">
                <span className='voterDTxt'>Voter Details</span>
            </div>
            <div className='voterDBottomDiv'>
                <div className="voterDBottomLeftDiv">
                    <span>Voter ID:</span>
                    <span>Name:</span>
                    <span>Age:</span>
                    <span>Gender:</span>
                </div>
                <div className='voterDBottomRightDiv'>
                    <span className='voterDDetails'>{this.props.voterID}</span>
                    <span className='voterDDetails'>{this.props.name}</span>
                    <span className='voterDDetails'>{this.props.age}</span>
                    <span className='voterDDetails'>{this.props.gender}</span>
                </div>
            </div>

        </div>
        )
    }
}

export default VoterDetails;