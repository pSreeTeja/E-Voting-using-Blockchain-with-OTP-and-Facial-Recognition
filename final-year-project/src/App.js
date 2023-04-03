import './App.css'; 
import React, { Component } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home  from "./Containers/Home"
import Admin  from "./Containers/Admin"
import User  from "./Containers/User"
import NewCandidate from "./Containers/NewCandidate"
import OTP from "./Containers/OTP"
import FacialRecognition from "./Containers/FacialRecogition"
import Election from "./build/Election.json"
import Web3 from 'web3';
import NotFound from './Containers/404NotFound';

class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/user" element={<User/>}/>
            <Route exact path="/admin" element={<Admin/>}/>
            <Route exact path="/admin/addcandidate" element={<NewCandidate/>}/>
            <Route exact path="/verify/otp" element={<OTP/>}/>
            <Route exact path="/verify/facialrecog" element={<FacialRecognition/>}/>
            <Route exact path="/*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
