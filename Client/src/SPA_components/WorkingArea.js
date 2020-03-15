import React, { Component } from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './App.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap from "react-bootstrap";
import {FormGroup, FormControl} from "react-bootstrap";
import { Link } from 'react-router-dom';

class WorkingArea extends Component {

componentDidMount(){
// OnLoad function
// if counter exceeds 5, then stop process
this.heading.innerHTML = this.props.location.state.userName+"</br>Start Your Car Data Gathering and Processing Jounrney";
this.buttonpressed = 0;
this.counter = 0;

}

downloadallfiles = () =>{
  axios.post("<enter link for post request>/",{
    username : this.props.location.state.userName
  })
    .then(res => { // then print response status
      //toast.success('upload success')
      console.log(res)
      // after creating the zip file, now download, delay for zip file creation
      this.wait(5000);
      this.testall();
    })
    .catch(err => {
    // then print response status
    console.log(err)
    })
}


handleSubmit = () =>{
  this.Message.innerHTML = "The process may take a few minutes..."
  axios.post("http://localhost:4000/download/",{
    username : this.props.location.state.userName,
    videoname : this.videoname.value,
    videourl : this.videourl.value,
  })
    .then(res => { // then print response status
      //toast.success('upload success')
      console.log(res)
      this.wait(10000);
      this.dividetheframes();

    })
    .catch(err => {
    // then print response status
    //  toast.error('upload fail')
    console.log("fail")
    console.log(err)
    })
}

Logout = () =>{
    const cookies = new Cookies()
    cookies.remove('username');
    window.location.reload(false);
}

render() {
    return (
      <div className = "BackgroundSign">
      <h1 className = "AppName" ref = {c => this.heading = c}></h1>
      <div className="SignIn">
        <form onSubmit={this.handleSubmit}>
        <p class = "SignInHead">Car Monitoring </p>
        <p class = "SignUpHead">Begin the data gathering and processing in just a few Steps.</p>
        &nbsp;
          <FormGroup controlId="url" bsSize="large">

          <p>Enter fields and tables required for the project</p>

          </FormGroup>

          <Button className="StartButton" block bsSize="large" onClick={this.handleSubmit} type="button">
            Download
          </Button>
          <br/>
          <p className = "ErrorMessage" ref = {c => this.Message = c}></p>
        </form>
      </div>
      <div className="SecondBoxSignIn">
        <p className = "LinkToAccount"> Done processing?&nbsp;
          <Link className="LinkToSignUp" onClick={this.Logout}>Log out</Link>
        </p>
      </div>
      </div>
    );
  }
}

export default WorkingArea;
