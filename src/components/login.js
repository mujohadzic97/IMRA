import React, { Component, useImperativeHandle } from "react";
import { useHistory } from 'react-router-dom';
import SignUp from "../SignUp/signup.js";
import  './login.css';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
      }

      errorToasterShow(){
        toast.error('Doslo je do greške!', {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
      }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    componentDidMount(){
        localStorage.removeItem('currentUserRole');
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('token');
    }
    
    onClick = event => {
        event.preventDefault();
        console.log("šaljem zahtjev")
        var user = {
            "userName": this.state.username,
	        "password": this.state.password
          };
        axios.post('http://localhost:8111/api/management/login', user ).then(function (response) {
            if(response.status == 200){
                
                localStorage.setItem('token', response.data.token);
                axios.get('http://localhost:8111/api/management/whoAmI',{
            headers: {
              Authorization: response.data.token 
            }}).then(res => {
                localStorage.setItem('currentUserRole', res.data.userRole);
                localStorage.setItem('currentUserId', res.data.userId);
                if(res.data.userRole=="1")
                    window.location.replace("/homeAdmin");
                else if(res.data.userRole=="2" || res.data.userRole=="3")
                    window.location.replace("/home");
                })
                .catch(error =>{
                    this.errorToasterShow();
                })                          
            }
          })
          .catch(function (error) {
            document.getElementById("pogresni_podaci").style.display = 'block';
          });
        
    }
    
    
    render() {
        return (
            <div id="loginDiv">
            <ToastContainer></ToastContainer>
            <form onSubmit = {this.onClick}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input id = "username" onChange={this.handleChangeUsername} type="username" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input  id = "password" onChange={this.handleChangePassword} type="password" className="form-control" placeholder="Enter password" />
                </div>
                <label id="pogresni_podaci" style={{display:"none", color:"red"}}>Pogresni korisnički podaci, pokušajte ponovo!</label>
                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                
            </form>
            </div>
        );
    }
}