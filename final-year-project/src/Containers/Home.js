import React, { Component } from 'react';
import {Link} from "react-router-dom"
import AdminImage from "../media/admin.png"
import PeopleImage from "../media/people.png"
import "../css/home.css"
import "../css/commonCss.css"
import Election from "../build/Election.json"
import Web3 from 'web3';
class Home extends React.Component{
    componentDidMount(){
        window.localStorage.clear();
    }

    render(){
        return( 
            <div className="mainHomeDiv">
                <div className="navbar"><span className="navbarTxt">E-Voting Application</span></div>
                <div className='bottomDiv bottomDivHome'>
                    <Link to="/user" className='userLinkAdmin'>
                        <div className="userHomeDiv">
                            <img className="adminImage" src={PeopleImage} alt="peopleImg"/>
                            <span className='userTxt'>User</span>
                        </div>
                    </Link>
                    <Link to="/admin" className='adminLinkAdmin'>
                        <div className="adminHomeDiv">
                            <img className="adminImage" src={AdminImage} alt="adminImg"/>
                            <span className='adminTxt'>Admin</span>
                        </div>
                    </Link>
                </div>
            </div>)
    }
}

export default Home;