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
this.heading.innerHTML = this.props.location.state.userName+"</br>Start Your Data Science Jounrney with XP-2";
this.buttonpressed = 0;
this.counter = 0;

}

downloadallfiles = () =>{
  axios.post("http://192.168.1.8:4000/downloadfiles/",{
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

testall = () =>{
  window.open('http://192.168.1.8:4000/videos/'+this.props.location.state.userName+'.zip');
}

dividetheframes = () =>{
  var username = this.props.location.state.userName
  var videoname =  this.videoname.value
  var imagetype = 'png'
  var videourl = 'http://localhost:4000/videos/'+username+'/downloads/'+videoname+'.mp4'
  var low = '1'
  var high = '5'
  var data = {'username':username,'videoname':videoname,'videourl':videourl,'imagetype':imagetype,'low':low,'high':high}
  console.log("inside the testdjangoapi function : ")
  axios.post("http://127.0.0.1:8000/index/",data)
    .then(res => { // then print response status
      //toast.success('upload success')
      console.log("API message : ")
      console.log(res)
      console.log(res.data["message"])
      if(this.DataRetrieved) {
       this.DataRetrieved.innerHTML = res.data["message"];
    }
    this.downloadallfiles();
    })
    .catch(err => { // then print response status
    //  toast.error('upload fail')
    console.log("fail")
    console.log(err)
    this.dividetheframes();
    })
}

wait = (ms) =>{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
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
        <p class = "SignInHead">X-P2</p>
        <p class = "SignUpHead">Begin the data gathering process with just a few steps.</p>
        &nbsp;
          <FormGroup controlId="url" bsSize="large">
            <FormControl
              autoFocus
              placeholder="Enter the url of the youtube video"
              ref = {c => this.videourl = c}
            />
          </FormGroup>

          <FormGroup controlId="url" bsSize="large">
            <FormControl
              autoFocus
              placeholder="Enter the name of the video"
              ref = {c => this.videoname = c}
            />
          </FormGroup>

          <Button className="StartButton" block bsSize="large" onClick={this.handleSubmit} type="button">
            Download
          </Button>
          <br/>
          <p className = "ErrorMessage" ref = {c => this.Message = c}></p>
        </form>
      </div>
      <div className="SecondBoxSignIn">
        <p className = "LinkToAccount"> Done downloading the files?&nbsp;
          <Link className="LinkToSignUp" onClick={this.Logout}>Log out</Link>
        </p>
      </div>
      </div>
    );
  }
}

export default WorkingArea;
