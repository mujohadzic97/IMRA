import React, { Component, useImperativeHandle } from "react";
import axios from 'axios';
import './instruktor.css'
import './profilInstruktor.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Instrukcije from './instrukcije.js';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from"react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

export default class ProfilKlijent extends Component {
    constructor(props) {
        super();
        this.state = {
            token : localStorage.getItem('token'),
            id : '',
            firstName:'',
            lastName:'',
            userName:'',
            registrationDate:''
        };
        
      }

    
    onClick = event => {
       
          
    }
    componentDidMount(){
        this.setState({id:this.props.id});

        
        axios.get('http://localhost:8111/api/management/client/'+this.props.id,{
            headers: {
              Authorization: this.state.token 
            }}).then(res => {
            this.setState({
                firstName : res.data.firstName,
                lastName:res.data.lastName,
                userName:res.data.userName,
                registrationDate:res.data.registrationDate
            })

          }).catch( error =>{
              
          }
        );

        
        
    }
    
    
    render() {
        

        const onClick = () => {
            
        }

        return (
<div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={"/home"}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/pocetna"}>Instruktori</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/profil"}>Profil</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/chat"}>Chat</Link>
                  </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}>Log Out</Link>
                        </li>
                </ul>
              </div>
            </div>
          </nav>
          <ul class="listaKartica"><li>
            <Card id="instruktorKartica" style={{ width: '80%' }}>
                <table class="datumOcjena">
                    <tr>
                        <td><Card.Img class="profilnaSlika" variant="top" src="client.png" style={{width:'170px',height:'170px'}} /></td>
                        <td><Card.Body id="instruktorInfo">
                            <Card.Title>Korisničko ime: {this.state.userName}</Card.Title>
                            <Card.Text id="naslov">Ime: {this.state.firstName}</Card.Text>
                            <Card.Text id="naslov">Prezime: {this.state.lastName}</Card.Text>
                            <Card.Text>Datum prijave: {this.state.registrationDate}</Card.Text>
                            </Card.Body>
                        </td>
                        
                    </tr>
                </table>

            </Card>
            </li>
            <li>
            <Card id="opisKartica" style={{ margin:'auto',width:"80%",height:"110%",marginTop:'30px',background:'#1C8EF9' }}>
              <table style={{ width:"100%", borderWidth:'50px', textAlign:'center'}}>
                <tr>
                  <td style={{ background:'#3C3A35',width:"50%",color:'white'}}><Card.Title style={{margin:'5%'}}>Instruktor</Card.Title></td>
                  <td style={{ background:'#FFC246',width:"50%"}}><Card.Title style={{margin:'5%'}}>Klijent</Card.Title></td>
                </tr>
              </table>
            </Card>
              </li></ul>
            <Instrukcije 
            idInstruktora = {null}
            idKlijenta = {this.props.id}
            ></Instrukcije>
            </div>
        );
    }
}