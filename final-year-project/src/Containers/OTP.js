import React, { Component } from 'react';
import "../css/otp.css"
class OTP extends Component{
    state={
        otp:"",
        status:"",
    }
    verify=async ()=>{
        console.log("hello from verify")
        const res=await fetch("/verifyotp",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                phno:JSON.parse(window.localStorage.getItem('phno')),
                otp:this.state.otp
            })
        }
        )
        const data=await res.json();
        if(data.status==="approved"){
            window.location.assign("/verify/facialrecog")
        }
        else{
            this.setState({status:"Incorrect OTP. Please Try Again"})
        }
    }
    render(){
        return(
            <div className='otpMainDiv'>
                <div className="navbar">
                    <span className='navbarTxt'>OTP Verification</span>
                </div>
                <div className='bottomDiv otpBottomDiv'>
                    <div className='otpInputBoxDiv'>
                        <span className="enterOTPTxt">Please enter the <b>OTP</b> sent to your Mobile No : {JSON.parse(window.localStorage.getItem('phno'))}</span>
                        <input className="otpInput" type="password" onChange={(e)=>{this.setState({otp:e.target.value})}}></input>
                        <button className="submitBtn" onClick={this.verify}>Verify</button>
                        <span className='errorOTPMsg'>{this.state.status}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default OTP;