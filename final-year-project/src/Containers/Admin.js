import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/admin.css"
class Admin extends React.Component{
    state={
        isAuth:false,
        pass:""
    }
    componentDidMount=async()=>{
        const res=await fetch("/isauth",{
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            console.log("here")
            if(res.status===200){
                this.setState({isAuth:true});
            }
        })
    }
    loginAPI=async ()=>{
        const response=await fetch("/login",
        {
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                password:this.state.pass,
            })
        }).then((res)=>{
            if(res.status===200){
                this.setState({isAuth:true});
            }
        })
    }
    logoutAdminAPI=async()=>{
        await fetch("/logout",{
            method:"GET",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            }
        }).then(()=>{
            this.setState({isAuth:false});
        })
    }
    render(){
        return(
            <div className="mainDivAdmin">
                <div className="navbar navbarAdmin">
                    <span className="navbarTxt">Admin</span>
                    {this.state.isAuth && <button className='submitBtn logoutBtn' onClick={this.logoutAdminAPI}>Logout</button>}</div>
                {this.state.isAuth?
                    <div className='loginPageDiv'>
                        <Link to="" className="linkStyle">
                            <div className='linkDiv'>
                                <span>New Election</span>  &gt;
                            </div>
                        </Link>
                        <Link to="" className="linkStyle">
                            <div className='linkDiv'>
                                <span>Elections</span>  &gt;
                            </div>
                        </Link>
                        <Link to="/admin/addcandidate" className="linkStyle">
                            <div className='linkDiv'>
                                <span>Add Candidate</span>  &gt;
                            </div>
                        </Link>
                    </div>
                    :
                    <div className="bottomDiv bottomDivAdmin">
                        <div className='passwordDivAdmin'>
                            <div className="passwordTxtDivAdmin">         
                                <span className='passwordTxtAdmin'>Password</span>                 
                            </div>
                            <input className='inputForPassAdmin' type='password' 
                            onChange={(e)=>{this.setState({pass:e.target.value})}} ></input>
                            <button className='submitBtn' onClick={this.loginAPI}>Submit</button>
                        </div>
                    </div>
                }
            </div>)
    }
}
export default Admin;