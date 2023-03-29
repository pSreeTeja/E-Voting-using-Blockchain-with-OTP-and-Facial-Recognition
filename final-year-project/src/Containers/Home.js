import React, { Component } from 'react';
import {Link} from "react-router-dom"
import AdminImage from "../media/admin.png"
import PeopleImage from "../media/people.png"
import "../css/home.css"
import Election from "../build/Election.json"
import Web3 from 'web3';
class Home extends React.Component{

    render(){
        return(
            <div className="mainHomeDiv">
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
            </div>)
    }
}

export default Home;